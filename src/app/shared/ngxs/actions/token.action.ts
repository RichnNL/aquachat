import {TokenModel} from '../../models/token.model';

export class SetToken {
    static readonly type = '[TOKEN] Set';
    constructor(public payload: TokenModel) {}
}

export class RemoveToken {
    static readonly type = '[TOKEN] Remove';
    constructor(public payload: TokenModel) {}
}

export class UpdateToken {
    static readonly type = '[TOKEN] Update';
    constructor(public payload: TokenModel) {}
}

