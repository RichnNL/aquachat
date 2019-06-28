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
        const token = this.getTokenFromDevice();
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
                 let user: UserModel = this.storage.getObject('user')
                 if (user) {
                     state.patchState({
                         user: user,
                         loggedIn: true,
                         currentToken: token
                    });
                } else {
                    user = this.azureService.setUser();
                    let user2: UserModel = this.storage.getObject('user');
                    if ( user !== null) {
                        state.patchState({
                            user: user,
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
                    state.patchState({
                        user: user
                   });
                }
                this.azureService.setAccessToken();
           }
         } else {
            this.setEmptyToken();
         }

    }
    constructor(private azureService: AzureService , private router: RouterHelper, private storage: StorageHelper
        , private aquaChatHttp: AquachatAPIService ) { }

    private getTokenFromDevice(): TokenModel {
        const token = this.storage.getTokenFromDevice();
        return token;
    }


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
                    console.log(currentDate);
                    console.log(token.expirationDate);
                    console.log('Token is expired');
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
            this.storage.setObject('user', payload);
            patchState({
                user: payload
            });
        }

    @Action(SetUserId)
        setUserId({getState, patchState}: StateContext<AuthenticationStateModel>, {payload}: SetUserId) {
            this.storage.setObject('userid', payload);
            patchState({
                id: payload
            });
        }
}
