import { Component, OnInit, Input } from '@angular/core';
// import { SignalRService } from '../../../../core/services/signalR.service';
import { MessageModel } from '../../../../core/models/MessageModel';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';
import { registerElement } from 'nativescript-angular/element-registry';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import {TextField} from 'tns-core-modules/ui/text-field';
import { SetMessages } from '../../../../shared/ngxs/actions/chat.action';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
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
  @Select(state => state.ChatState.currentWorkspace) currentWorkspaces$: Observable<WorkspaceDetailsModel>;
  send = '../../../../../assets/media/send_message.png';
  sendMobile = 'res://send_message';
  value: string;
  userId: string;
  email: string[];
  chatid;
  isWorkspace: boolean;
  isDirect: boolean;
  sub: Subscription;
  constructor(private webAPI: AquachatAPIService, private store: Store) {
    this.user$.subscribe(user => {
      if (user && user.UserId.length > 0 && user.UserId !== 'undefined') {
        this.userId = user.UserId;
        this.email = [user.Email];
      }
    });

    this.currentWorkspaces$.subscribe(result => {
      if (result != null) {
        if (result.Id.length > 0) {
          this.isWorkspace = true;
          this.isDirect = false;
          this.chatid = result.Id;
          const ob = new Observable(observer => {
                setTimeout(() => {
                    observer.next(), 2500 }
                );
          });

          this.sub = ob.subscribe(() => {
              this.getMessage();
          });
        }
      }
    });


    this.chat$.subscribe((result) => {
      if (result !== null) {
        this.chatid = result;
        this.isWorkspace = false;
        this.isDirect = true;
        const ob = new Observable(observer => {
          setTimeout(() => {
              observer.next(), 2500 }
          );
    });

    this.sub = ob.subscribe(() => {
        this.getMessage();
    });
      }
    });


    this.workspace$.subscribe(result => {
      if (result !== null) {
        if (result.length > 0) {
          this.isWorkspace = true;
          this.isDirect = false;
          this.chatid = result;
          const ob = new Observable(observer => {
            setTimeout(() => {
                observer.next(), 2500 }
            );
      });

      this.sub = ob.subscribe(() => {
          this.getMessage();
      });
         }
        }
      });
   }

  ngOnInit() {}

  sendMessage() {
    console.log(this.value);
    if (this.value && this.value.length > 0) {
      const payload = this.value;
      const messageModel = new MessageModel();
      messageModel.Type = 'text';
      messageModel.SenderID = this.userId;
      messageModel.SenderEmail = this.email[0];
      messageModel.Payload = payload;
      
      if (this.isWorkspace) {
        messageModel.WorkspaceId = this.chatid;
        messageModel.ChannelId = '';
        messageModel.ChatId = '';
      } else {
        messageModel.ChatId = this.chatid;
        messageModel.WorkspaceId = '';
        messageModel.ChannelId = '';
      }
      this.webAPI.sendMessage(messageModel).subscribe(() => {
        if (this.isWorkspace) {
          this.webAPI.getWorkspaceMessages(this.userId, this.chatid).subscribe((result) => {
            this.store.dispatch(new SetMessages(result));
          });
        } else {
          this.webAPI.getDirectMessage(this.userId, this.chatid).subscribe((result) => {
            console.log(result);
            this.store.dispatch(new SetMessages(result));
          });
        }
      }

      );
      this.value = '';
    }

  }

  type(text: string) {
    this.value = text;
  }

  private getMessage() {
    if (this.isWorkspace) {
      this.webAPI.getWorkspaceMessages(this.userId, this.chatid).subscribe((result) => {
        this.store.dispatch(new SetMessages(result));
      });
    } else {
      this.webAPI.getDirectMessage(this.userId, this.chatid).subscribe((result) => {
        console.log(result);
        this.store.dispatch(new SetMessages(result));
      });
  }
}

}