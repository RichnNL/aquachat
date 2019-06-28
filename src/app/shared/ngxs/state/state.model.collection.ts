import {LanguageModel} from '../../models/language.model';
import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';
import { HttpHeaders } from '@angular/common/http';
import { WorkspaceDetailsModel } from '../../../core/models/WorkspaceDetailsModel';
import { OtherUserModel } from '../../../core/models/OtherUserModel';
import { MessageModel } from '../../../core/models/MessageModel';
import { ChatModel } from '../../../core/models/ChatModel';
import { ChatGroupModel } from '../../models/chatGroup.model';

export interface LanguageStateModel {
    currentLanguage: LanguageModel;
    languageOptions: LanguageModel[];
}

export interface AuthenticationStateModel {
    loggedIn: boolean;
    currentToken: TokenModel;
    user: UserModel;
    id: string;
}

export interface ApplicationStatusStateModel {
    // 0 Not Loading, 1 Loading, -1 Timeout Error
    isLoading: number;
    // In miliseconds
    timeout: number;
}

export interface UIStateModel {
    sideNavOpen: boolean;
    canGoBack: boolean;
    showWorkspaces: boolean;
    actionBarTitle: string;
}

export interface ChatStateModel {
    currentWorkspace: WorkspaceDetailsModel;
    currentChannelId: string;
    currentChatId: string;
    myWorkspaces: WorkspaceDetailsModel[];
    available: number;
    selectedUsers: OtherUserModel[];
    currentMessages: MessageModel[];
    currentChat: ChatModel;
    cachedChatGroups: ChatGroupModel[];
    currentWorkspaceId: string;
    currentMessage: MessageModel[];
}




