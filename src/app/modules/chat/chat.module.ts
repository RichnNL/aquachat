import {NgModule} from '@angular/core';
import { ChatSelectComponent } from './components/chat-select/chat-select.component';
import {ChatToolComponent} from './components/chat-tools/chat-tool.component';
import {ChatSMSComponent} from './components/chat-sms/chat-sms.component';
import { MaterialModule } from '../webSpecific/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatNotificationComponent } from './components/chat-notification/chat-notification.component';
import { ChatSendComponent } from './components/chat-send/chat-send.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
@NgModule({
    declarations: [
        ChatSelectComponent,
        ChatToolComponent,
        ChatSMSComponent,
        ChatSendComponent,
        ChatBoxComponent,
        ChatNotificationComponent
    ],
    imports: [MaterialModule,
        FormsModule,
        CommonModule,
    ],
    exports: [ChatSelectComponent,
        ChatSendComponent,
        ChatBoxComponent,
        ChatToolComponent,
        ChatNotificationComponent,
        ChatSMSComponent,],
    providers: [],
    bootstrap: []
  })
  export class ChatModule { }
