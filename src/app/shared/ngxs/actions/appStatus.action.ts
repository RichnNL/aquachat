export class IsLoading {
    static readonly type = '[Application Status] Loading';
    constructor(public payload: number) {}
}

export class SetTimeoutLength {
    static readonly type = '[Application Timeout Length] Timeout Length';
    constructor(public payload: number) {}
}
