import { Injectable} from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenModel } from '../../shared/models/token.model';
import { StorageHelper } from '../../shared/helpers/storage/storage.helper';
import { MobileServiceClient } from 'nativescript-azure-mobile-apps/client';
import { AzureConfiguration} from '../../config/azure.config.tns';
import { AuthenticationProvider, MobileServiceUser} from 'nativescript-azure-mobile-apps/user';
import {SetAccessToken, SetUser} from '../../shared/ngxs/actions/authentication.action';
import { UserModel } from '../../shared/models/user.model';
import { RouterHelper } from '../../shared/helpers/router/router.helper';
import {AquachatAPIService} from '../../core/services/aquachatAPI.service';
import { RegisterUserDetails } from '../models/RegisterUserDetailsModel';
import * as Toast from 'nativescript-toast';

@Injectable()
export class AzureService {

     private azureClientApplication: MobileServiceClient;

    constructor(private store: Store, private storage: StorageHelper, private router: RouterHelper,
         private aquaChatAPI: AquachatAPIService) {
         this.azureClientApplication = new MobileServiceClient(AzureConfiguration.url);
        }

    public  azureLogin() {
        const loggedIn = this.azureClientApplication.loginFromCache();
        if (!loggedIn) {
            const token = new TokenModel();
            this.azureClientApplication.login(AuthenticationProvider.AzureActiveDirectory).then((user) => {
                 user.getProviderCredentials().then((result) => {
                    console.log(result);
                    const resultString = JSON.stringify(result.claims);
                    const logedInUser: UserModel = this.toUserModel(resultString);
                    if (logedInUser) {
                        this.storage.setObject('user', logedInUser);
                        const experation = Number.parseInt(this.getBetweenStrings(resultString, 'exp', ','));
                        const token = new TokenModel(user.authenticationToken, 'access', experation);
                        this.store.dispatch(new SetAccessToken(token));
                    }
                });
            }).catch((error) => {
               token.token = '';
               token.tokenType = 'errorr';
               console.log(error + ' ERROR!');
            });
        }
    }


    private getExpirationDate(): number {
        const totalLifeTimeInMiliseconds = Date.parse(new Date().toDateString()) + AzureConfiguration.id_access_token_lifetime;
        return totalLifeTimeInMiliseconds;
    }

    public logOut() {
        MobileServiceUser.clearCachedAuthenticationInfo();
        this.router.logOut();
    }

    public setAccessToken() { return; }
    public editProfile() {}
    public setUser(): UserModel {return new UserModel();}

    private getBetweenStrings( text: string, textFrom: string, textTo: string): string {
        let result = '';
        result = text.substring(text.indexOf(textFrom) + textFrom.length, text.length);
        result = result.substring(0, result.indexOf(textTo));
        result = result.replace(/['":-]+/g, '');
        return result;
      }

      private toUserModel(claim: string): UserModel {
        const userModel = new UserModel();
        const emails = this.getBetweenStrings(claim, 'emails', ',' );
        const userId = this.getBetweenStrings(claim, 'objectidentifier', ',' );
        const newUser = this.getBetweenStrings(claim, 'newUser', ',' );
        const name = this.getBetweenStrings(claim, 'name":', ',' );
        const givenname = this.getBetweenStrings(claim, 'givenname', ',' );
        const jobTitle = this.getBetweenStrings(claim, 'jobTitle', ',' );
        const surname = this.getBetweenStrings(claim, 'surname', ',' );

        if (userId) {
            userModel.UserId = userId;
        } else {
            return null;
        }
        if (emails) {
            userModel.Email = emails;
        }
        if (name) {
            userModel.Firstame = name;
        }
        if (surname) {
            userModel.LastName = surname;
        }
        if (jobTitle) {
            userModel.JobTitle = jobTitle;
        }
        if (givenname) {
            userModel.DisplayName = givenname;
        }
        if (newUser) {
            if (newUser === 'true') {
                // TODO Register for notifications
                console.log('new user');
                const user: RegisterUserDetails = this.getRegisterUser(userModel);
                this.aquaChatAPI.registerUser(user).subscribe(result => {
                    let message;
                    if (result.Message) {
                        message = result.Message;
                    } else {
                        message = result.ErrorMessage[0];
                    }
                    Toast.makeText(message).show();
                });
            }
        }
        return userModel;
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


