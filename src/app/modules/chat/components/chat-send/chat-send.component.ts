import { Component, OnInit, Input } from '@angular/core';
// import { SignalRService } from '../../../../core/services/signalR.service';
import { MessageModel } from '../../../../core/models/MessageModel';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-chat-send',
  templateUrl: './chat-send.component.html',
  styleUrls: ['./chat-send.component.scss']
})
export class ChatSendComponent {
  @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
  @Select(state => state.ChatState.currentChatId) chat$: Observable<string>;
  @Select(state => state.ChatState.currentChannelId) channel$: Observable<string>;
  @Select(state => state.ChatState.currentWorkspaceId) workspace$: Observable<string>;
  send = '../../../../../assets/media/send_message.png';
  value: string;
  userId: string;
  email: string[];
  chatid;
  // private signalr: SignalRService
  constructor() {
    this.user$.subscribe(user => {
      if (user && user.UserId.length > 0 && user.UserId !== 'undefined') {
        this.userId = user.UserId;
        this.email = [user.Email];
      }
    });

    this.chat$.subscribe((result) => {
      if (result !== null) {
        this.chatid = result;
      }
    });
   }

  ngOnInit() {}

  sendMessage() {
    if (this.value && this.value.length > 0) {
      const payload = this.value;
      this.value = '';
      const messageModel = new MessageModel();
      messageModel.Type = 'text';
      messageModel.SenderID = this.userId;
      messageModel.SenderEmail = this.email[0];
      messageModel.Payload = payload;
      messageModel.ChatId = this.chatid;
     // this.signalr.sendMessage(messageModel);
    }

  }
}