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
