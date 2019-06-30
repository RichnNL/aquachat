import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { AzureConfiguration } from '../../config/azure.config';
import { Store } from '@ngxs/store';
import { TokenModel } from '../../shared/models/token.model';
import { StorageHelper } from '../../shared/helpers/storage/storage.helper';
import { UserModel } from '../../shared/models/user.model';
import { SetAccessToken, SetUser } from '../../shared/ngxs/actions/authentication.action';
import {AquachatAPIService} from '../../core/services/aquachatAPI.service';
import { RegisterUserDetails } from '../models/RegisterUserDetailsModel';

@Injectable()
export class AzureService {

    private azureClientApplication: Msal.UserAgentApplication;
    constructor(private store: Store, private storage: StorageHelper, private aquaChatAPI: AquachatAPIService) {
            this.azureClientApplication = new Msal.UserAgentApplication(AzureConfiguration.clientID, AzureConfiguration.authority,
                async (errorDesc, token, error, tokenType) => {
                if (tokenType === 'id_token') {
                        this.setIdToken(token);
                }
                else if (tokenType === 'access_token') {
                    this.LoggedInSuccess(token, true);
                 }
            },
            AzureConfiguration.options  );
        }

    public  azureLogin() {
        this.azureClientApplication.loginRedirect(AzureConfiguration.b2cScopes);
    }

    public setAccessToken() {
            this.azureClientApplication.acquireTokenSilent(AzureConfiguration.b2cScopesAPI).then((token) => {
                this.LoggedInSuccess(token, false);
            }).catch((error) => {
                const outerror = error.toString();
                if (outerror.includes('not have an existing session')) {
                    // Browser Or Anti-Virus Prevents Saving Token
                    this.azureClientApplication.acquireTokenRedirect(AzureConfiguration.b2cScopesAPI);
                } else {
                    console.log('ERROR: ' + error);
                }
            });
    }

    private setIdToken(token: string) {
        const totalLifeTimeInMiliseconds = Date.parse(new Date().toDateString()) + AzureConfiguration.id_access_token_lifetime;
        const idToken = new TokenModel(token, 'id', totalLifeTimeInMiliseconds);
        this.storage.setObject('azureToken', idToken);
    }

    private getExpirationDate(): number {
        const totalLifeTimeInMiliseconds = Date.parse(new Date().toDateString()) + AzureConfiguration.id_access_token_lifetime;
        return totalLifeTimeInMiliseconds;
    }

    private AzureUserToUser(user: Msal.User): UserModel {
        const c: any = user.idToken.valueOf();
        if (c !== null) {
            const model = new UserModel( );

            if (c.emails) {
                model.Email = c.emails[0];
            }
            if (c.name) {
                model.DisplayName = c.name;
            }
            if (c.jobTitle) {
                model.JobTitle = c.jobTitle;
            }
            if (c.family_name) {
                model.LastName = c.family_name;
            }
            if (c.name) {
                model.Firstame = c.name;
            }
            if (c.oid) {
                model.UserId = c.oid.replace(/[-]+/g, '');
            }
            if (c.newUser) {
                const register = this.getRegisterUser(model);
                if (register) {
                    this.aquaChatAPI.registerUser(register).toPromise().then((respon) => {
                        let message;
                        if (respon.Message) {
                            message = respon.Message;
                        } else {
                            message = respon.ErrorMessage[0];
                        }
                    }).catch(reason => {
                        console.log('Error Registering New User');
                    });
                }
            }
            return model;
        } else {
            return null;
        }
    }

    private LoggedInSuccess(token: string, callback: boolean) {
        const accessToken = new TokenModel(token, 'access', this.getExpirationDate());
        if (callback) {
            this.storage.setObject('azureToken', accessToken);
        } else {
            this.store.dispatch(new SetAccessToken(accessToken));
        }
    }

    public setUser(): UserModel {
        const user = this.AzureUserToUser( this.azureClientApplication.getUser());
        return user;
    }
    public logOut() {
      this.azureClientApplication.logout();
      this.storage.setObject('user', '');
    }

    public editProfile() {
        this.azureClientApplication.authority = AzureConfiguration.editPolicy;
        this.azureClientApplication.loginPopup(AzureConfiguration.b2cScopes).then(result => {
            const user = this.setUser();
            this.store.dispatch(new SetUser(user));
        }).catch(error => {
            console.log('Edit Profile Error ' + error);
        });
    }

    private getRegisterUser(user: UserModel) {
        const registerUser = new RegisterUserDetails();
        registerUser.Email = [];
        if (user.DisplayName) {
            registerUser.DisplayName = user.DisplayName;
        }
        if (user.UserId) {
            registerUser.UserId = user.UserId;
        }
        if (user.LastName) {
            registerUser.LastName = user.LastName;
        }
        if (user.Firstame) {
            registerUser.FirstName = user.Firstame;
        }
        if (user.DisplayName) {
            registerUser.DisplayName = user.DisplayName;
        }
        if (user.JobTitle) {
            registerUser.JobTitle = user.JobTitle;
        }
        if (user.Email) {
            registerUser.Email.push(user.Email);
        }
        return registerUser;
      }

}
