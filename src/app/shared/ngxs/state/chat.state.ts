import {State, Action, StateContext, NgxsOnInit, Selector} from '@ngxs/store';
import { ChatStateModel } from './state.model.collection';
import { SetCurrentWorkspace, SetMyWorkSpaces, ClickedAvailable, AddUserToChat,
     ClearChat, SetGroupChat, SetChatId, SetChannelId, SetWorkspaceId, SetMessage } from '../actions/chat.action';
import { AquachatAPIService } from '../../../core/services/aquachatAPI.service';
import { OtherUserModel } from '../../../core/models/OtherUserModel';
import { StorageHelper } from '../../helpers/storage/storage.helper';
import { ChatGroupModel } from '../../models/chatGroup.model';
import { MessageModel } from '../../../core/models/MessageModel';
import { NotificationMapModel } from '../../models/notificationMap.Model';



@State<ChatStateModel>({
    name: 'ChatState',
    defaults: {
        currentWorkspace: null,
        currentChannelId: '',
        myWorkspaces: [],
        available: -1,
        selectedUsers: [],
        currentMessages: [],
        currentChatId: null,
        currentChat: null,
        cachedChatGroups: null,
        currentWorkspaceId: null,
        currentMessage: null,
        notificationMap: null
    }
})


export class ChatStatusState implements NgxsOnInit {

    constructor(private webAPI: AquachatAPIService, private storage: StorageHelper) {}
    private allMessages: MessageModel[];
    ngxsOnInit(state: StateContext<ChatStateModel>) {
       const chats: ChatGroupModel[] = this.storage.getObject('chats');
       this.allMessages = this.storage.getObject('messages');
       if (chats !== null) {
           state.patchState({
            cachedChatGroups: chats
           });
       }

       const notificationMap = new NotificationMapModel();
       notificationMap.totalChannel = 3;
       notificationMap.totalDirect = 10;
       notificationMap.totalWorkspace = 2;

       state.patchState({
        notificationMap: notificationMap
       });
    }


    private getEmails(userModels: OtherUserModel[]) {
        const emails = new Array<string>();
        userModels.forEach(user => {
            if (user.Email) {
                emails.push(user.Email[0]);
            }
        });
        return emails;
    }

    private getGroupId(chat: ChatGroupModel[], selectedUsers: OtherUserModel[] ): string {
        if (chat !== null) {
            chat.forEach(element => {
                let elementFound = true;
                for (let i = 0; i < element.emails.length || !elementFound; i++ ) {
                  const index = selectedUsers.findIndex(value => value.Email.includes(element.emails[i]));
                  if (index === -1) {
                      elementFound = false;
                  }
                }
                if (elementFound) {
                  return element.chatId;
                }
          });
        }
        return null;
    }

    @Action(SetCurrentWorkspace)
        setCurrentWorkspace({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetCurrentWorkspace) {
            patchState({
                currentWorkspace: payload
            });
        }
    @Action(SetMyWorkSpaces)
        setMyWorkSpaces({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetMyWorkSpaces) {
            patchState({
                myWorkspaces: payload
            });
        }

        @Action(ClickedAvailable)
        availableClicked({getState, patchState}: StateContext<ChatStateModel>, {}: ClickedAvailable) {
            let a = getState().available;
            if ( a === -1 || a === 1) {
                a = 2;
            } else {
                a = 1;
            }
            patchState({
                available: a
            });
        }

        @Action(AddUserToChat)
        addToChat({getState, patchState}: StateContext<ChatStateModel>, {payload}: AddUserToChat) {
            const chatList = new Array<OtherUserModel>();
            getState().selectedUsers.forEach(user => {
                chatList.push(user);
            });

            if (chatList.includes(payload)) {
              const index =  chatList.findIndex(value => value.Email[0] === payload.Email[0]);
              chatList.splice(index);
            } else {
                chatList.push(payload);
            }
            const chatGroups = getState().cachedChatGroups;
            let groupId = this.getGroupId(chatGroups, chatList);
            if (chatList.length > 0 && groupId == null) {
                groupId = '';
            }

            if (groupId !== null) {

                patchState({
                    selectedUsers: chatList,
                    currentChatId: groupId
                });
            } else {
                patchState({
                    selectedUsers: chatList
                });
            }

        }

        @Action(ClearChat)
        clearChat({getState, patchState}: StateContext<ChatStateModel>, {}: ClearChat) {
            patchState({
                selectedUsers: []
            });
        }

        @Action(SetWorkspaceId)
        setWorkspaceId({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetWorkspaceId) {
            const chatGroupModel = new ChatGroupModel(payload, [], 'workspace');
            this.storage.setObject('previousChat', chatGroupModel);
            patchState({
                currentWorkspaceId: payload
            });
        }


        @Action(SetChannelId)
        setChannelId({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetChannelId) {
            const chatGroupModel = new ChatGroupModel(payload, [], 'channel');
            this.storage.setObject('previousChat', chatGroupModel);
            patchState({
                currentChannelId: payload
            });
        }


        @Action(SetChatId)
        setChatId({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetChatId) {
            const chatGroupModel = new ChatGroupModel(payload, [], 'direct');
            this.storage.setObject('previousChat', chatGroupModel);
            patchState({
                currentChatId: payload
            });
        }

        @Action(SetMessage)
        setMessage({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetMessage) {
            patchState({
                currentMessage: payload
            });
        }

        @Action(SetGroupChat)
        SetGroupChat({getState, patchState}: StateContext<ChatStateModel>, {payload}: SetGroupChat) {
            const chats = getState().cachedChatGroups;
            const chatList = new Array<ChatGroupModel>();
            if (chats !== null) {
                chats.forEach((c) => {
                    chatList.push(c);
                });
            }

            chatList.push(payload);

            this.storage.setObject('chats', chatList);

            patchState({
                cachedChatGroups: chatList,
                currentChatId: payload.chatId
            });
        }

}
