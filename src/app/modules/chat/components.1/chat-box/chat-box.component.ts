import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';
import { Observable } from 'rxjs';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { UserModel } from '../../../../shared/models/user.model';
import { MessageModel } from '../../../../core/models/MessageModel';
import { ChatStateModel } from '../../../../shared/ngxs/state/state.model.collection';
import { SetChatId, SetGroupChat } from '../../../../shared/ngxs/actions/chat.action';
import { ChatGroupModel } from '../../../../shared/models/chatGroup.model';
import { ChatStatusState } from '../../../../shared/ngxs/state/chat.state';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  show = false;
  @Select(state => state.ChatState.currentChatId) chat$: Observable<string>;
  @Select(state => state.ChatState.currentChannelId) channel$: Observable<string>;
  @Select(state => state.ChatState.currentWorkspaceId) workspace$: Observable<string>;
  @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;

  user: UserModel;
  messages: MessageModel[];
  constructor(private store: Store, private webapi: AquachatAPIService) {
      this.user$.subscribe(user => {
        if (user && user.UserId.length > 0 && user.UserId !== 'undefined') {
          this.user = user;
        }
      });

      this.chat$.subscribe((chatId) => {
        if (chatId !== null) {
          if (chatId.length > 0) {
            this.webapi.getDirectMessage(this.user.UserId, chatId).subscribe((messages) => {
              this.messages = messages;
            });
          } else if (chatId.length === 0) {
            const users = this.store.selectSnapshot(ChatStatusState).selectedUsers;
            const emails = new Array<string>();
            users.forEach(user => {
              emails.push(user.Email[0]);
            });

            if (users.length > 0) {
              this.webapi.getChatIdFromEmails(this.user.UserId, emails).subscribe((responseModel) => {
                if (responseModel.Message != null) {
                  const id = responseModel.Message;
                  const chatGroup = new ChatGroupModel(id, emails);
                  this.store.dispatch(new SetGroupChat(chatGroup));
                }
              });
            }
          }
        }
      });
   }

  isUser(email: string): boolean {
    if (email === this.user.Email) {
      return true;
    } else {
      return false;
    }
  }

}