export class ToggleSideNav {
    static readonly type = '[UI] Toggle Side Nav';
    constructor() {}
}

export class SetCanGoBack {
    static readonly type = '[UI] Set If ActionBar Can Go Back';
    constructor(public payload: boolean) {}
}

export class ToggleWorkspaces {
    static readonly type = '[UI] Toggle Workspaces';
    constructor() {}
}

export class SetActionTitle {
    static readonly type = '[UI] Set Title';
    constructor(public payload: string) {}
}

export class SetPreviousTitle {
    static readonly type = '[UI] Set Previous Title';
    constructor() {}
}
