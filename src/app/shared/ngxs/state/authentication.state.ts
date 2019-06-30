import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { AuthenticationStateModel } from './state.model.collection';
import { AzureService } from '../../../core/authentication/azure.service';
import { TokenModel } from '../../models/token.model';
import { SetLoggedIn, LogInUser, SetAccessToken, SetUser, SetUserId } from '../actions/authentication.action';
import { RouterHelper } from '../../helpers/router/router.helper';
import { StorageHelper } from '../../helpers/storage/storage.helper';
import { UserModel } from '../../models/user.model';
import { RegisterUserDetails } from '../../../core/models/RegisterUserDetailsModel';
import { AquachatAPIService } from '../../../core/services/aquachatAPI.service';

@State<AuthenticationStateModel>({
    name: 'AuthenticationState',
    defaults: {
    loggedIn: false,
    currentToken: new TokenModel(),
    user: new UserModel(),
    id: ''
    }
})


export class AuthenticationState implements NgxsOnInit {
    ngxsOnInit(state: StateContext<AuthenticationStateModel>) {
        const token: TokenModel = this.storage.getTokenFromDevice();
        const id = this.storage.getVariable('userid');
        if (id) {
            if (id.length > 0) {
                state.patchState({
                    id: id
               });
            }
        }
        if (this.tokenIsValid(token)) {
             if (token.tokenType === 'access') {
                 let user: UserModel = this.storage.getObject('user');
                 if (user) {
                     state.patchState({
                         user: user,
                         loggedIn: true,
                         currentToken: token
                    });
                } else {
                    user = this.azureService.setUser();

                    this.saveUserLocally(user, state.patchState);
                    if ( user !== null) {
                        state.patchState({
                            loggedIn: true,
                            currentToken: token
                       });
                    } else {
                        state.patchState({
                            loggedIn: true,
                            currentToken: token
                       });
                    }
                }
              this.router.autoLogin();
            } else if (token.tokenType === 'id') {
                const user = this.azureService.setUser();

                if (user !==  null) {
                    this.saveUserLocally(user, state.patchState);
                }
                this.azureService.setAccessToken();
           }
         } else {
            this.setEmptyToken();
         }

    }
    constructor(private azureService: AzureService , private router: RouterHelper, private storage: StorageHelper
        , private aquaChatHttp: AquachatAPIService ) { }

    private tokenIsValid(token: TokenModel): boolean {
        try {
            if (!token.token) {
                return false;
            }
            if (token.expirationDate) {
                let currentDate: number = Date.parse(new Date().toDateString());
                const expirationLength = token.expirationDate.toString().length;
                currentDate = Number.parseInt(currentDate.toString().substring(0,expirationLength));
                if (currentDate > token.expirationDate) {
                    return false;
                }
            }
            if (token.tokenType) {
                if (token.tokenType === 'error') {
                    return false;
                }
            }
        } catch {
            return false;
        }
        return true;
    }

    private setEmptyToken(): TokenModel {
        const emptyToken = new TokenModel('', 'logout');
        this.storage.setObject('azureToken', emptyToken);
        return emptyToken;
    }

    private saveTokenLocally(token: TokenModel, patchState: (val: Partial<AuthenticationStateModel>) => AuthenticationStateModel ) {
        if (this.tokenIsValid(token)) {
            this.storage.setObject('azureToken', token);
            patchState({
                currentToken: token,
                loggedIn: true
            });
        } else {
            patchState({
                loggedIn: false
            });
        }
    }

    private saveUserLocally(user: UserModel, patchState: (val: Partial<AuthenticationStateModel>) => AuthenticationStateModel ) {
        let savedUser: UserModel = this.storage.getObject('user');
        if (savedUser == null) {
            savedUser = user;
        } else {
            if (user.UserId != null) {
                if (user.UserId.length > 0) {
                    savedUser.UserId = user.UserId;
                }
            }
    
            if (user.DisplayName != null) {
                if (user.DisplayName.length > 0) {
                    savedUser.DisplayName = user.DisplayName;
                }
            }
    
            if (user.Email != null) {
                if (user.Email.length > 0) {
                    savedUser.Email = user.Email;
                }
            }
    
            if (user.Firstame != null) {
                if (user.Firstame.length > 0) {
                    savedUser.Firstame = user.Firstame;
                }
            }
    
            if (user.LastName != null) {
                if (user.LastName.length > 0) {
                    savedUser.LastName = user.LastName;
                }
            }
           if (user.JobTitle != null) {
                if (user.JobTitle.length > 0) {
                    savedUser.JobTitle = user.JobTitle;
                }
            }
        }
        this.storage.setObject('user', user);
        patchState({
            user: savedUser
        });
    }

    @Action(SetLoggedIn)
        setLoggedIn({getState, patchState}: StateContext<AuthenticationStateModel>, {payload}: SetLoggedIn) {
            const emptyUser = new UserModel();
            const emptyToken = this.setEmptyToken();
            if (!payload) {
                // TODO
                patchState({
                    currentToken: emptyToken,
                    loggedIn: true,
                    user: emptyUser
                });
                this.azureService.logOut();
            } else {
                patchState({
                    loggedIn: true
                });
            }
        }

    @Action(LogInUser)
        loginUser({getState, patchState}: StateContext<AuthenticationStateModel>, loginUser: LogInUser) {
           this.azureService.azureLogin();
        }

    @Action(SetAccessToken)
        SetToken({getState, patchState}: StateContext<AuthenticationStateModel>, {payload}: SetAccessToken) {
            if (payload.tokenType === 'access') {
                this.saveTokenLocally(payload, patchState);
                this.router.loggedIn();
            }
        }

    @Action(SetUser)
        setUser({getState, patchState}: StateContext<AuthenticationStateModel>, {payload}: SetUser) {
            this.saveUserLocally(payload, patchState);
        }

    @Action(SetUserId)
        setUserId({getState, patchState}: StateContext<AuthenticationStateModel>, {payload}: SetUserId) {
            this.storage.setObject('userid', payload);
            patchState({
                id: payload
            });
        }
}
