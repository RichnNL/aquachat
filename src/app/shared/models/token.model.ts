export class TokenModel {
    token: string;
    tokenType?: string;
    expirationDate?: number;

    constructor(token?: string, tokenType?: string, expirationDate?: number) {
        this.token = token;
        this.tokenType = tokenType;
        this.expirationDate = expirationDate;
    }
}
