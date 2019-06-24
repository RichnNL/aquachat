import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';

export class SetLoggedIn {
    static readonly type = '[AUTHENTICATION] LoggedIn';
    constructor(public payload: boolean) {}
}

export class LogInUser {
    static readonly type = '[AUTHENTICATION] LogIn';
    constructor() {}
}

export class SetAccessToken {
    static readonly type = '[AUTHENTICATION] SetToken';
    constructor(public payload: TokenModel) {}
}

export class SetUser {
    static readonly type = '[AUTHENTICATION] SetUser';
    constructor(public payload: UserModel) {}
}

export class SetUserId {
    static readonly type = '[AUTHENTICATION] SetUserID';
    constructor(public payload: string) {}
}
