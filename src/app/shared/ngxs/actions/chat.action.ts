import { WorkspaceDetailsModel } from '../../../core/models/WorkspaceDetailsModel';
import { OtherUserModel } from '../../../core/models/OtherUserModel';
import { ChatGroupModel } from '../../models/chatGroup.model';
import { ChatModel } from '../../../core/models/ChatModel';
import { MessageModel } from '../../../core/models/MessageModel';

export class SetCurrentWorkspace {
    static readonly type = '[Chat] Workspace';
    constructor(public payload: WorkspaceDetailsModel) {}
}

export class SetMyWorkSpaces {
    static readonly type = '[Chat] MyWorkspace';
    constructor(public payload: WorkspaceDetailsModel[]) {}
}

export class ClickedAvailable {
    static readonly type = '[Chat] Available';
    constructor() {}
}

export class AddUserToChat {
    static readonly type = '[Chat] Adduser';
    constructor(public payload: OtherUserModel) {}
}

export class ClearChat {
    static readonly type = '[Chat] Clearuser';
    constructor() {}
}

export class SetGroupChat {
    static readonly type = '[Chat] SetChatGroup';
    constructor(public payload: ChatGroupModel) {}
}

export class SetChatId {
    static readonly type = '[Chat] SetChatId';
    constructor(public payload: string) {}
}

export class SetWorkspaceId {
    static readonly type = '[Chat] SetWorkspaceId';
    constructor(public payload: string) {}
}

export class SetChannelId {
    static readonly type = '[Chat] SetChannelId';
    constructor(public payload: string) {}
}

export class SetCurrentChat {
    static readonly type = '[Chat] SetChatCurrentGroup';
    constructor(public payload: ChatModel) {}
}

export class SetMessages {
    static readonly type = '[Chat] SetMessages';
    constructor(public payload: MessageModel[]) {}
}

export class AddMessage {
    static readonly type = '[Chat] AddMessage';
    constructor(public payload: MessageModel) {}
}



