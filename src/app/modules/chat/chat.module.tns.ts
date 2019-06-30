import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ChatSelectComponent} from './components/chat-select/chat-select.component';
import {ChatToolComponent} from './components/chat-tools/chat-tool.component';
import {ChatSMSComponent} from './components/chat-sms/chat-sms.component';
import { ChatSendComponent } from './components/chat-send/chat-send.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatNotificationComponent } from './components/chat-notification/chat-notification.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        ChatToolComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        ChatToolComponent,
        ],
    providers: [],
    bootstrap: []
  })
  export class ChatModule { }
