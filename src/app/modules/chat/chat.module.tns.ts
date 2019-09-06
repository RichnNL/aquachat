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
import { MenuModule } from '../menu/menu.module.tns';
import { MessageItemComponent } from './components/messageItem/messageItem.component.tns';
import { HeaderItemComponent } from './components/headerItem/headerItem.component.tns';
@NgModule({
    declarations: [
        ChatToolComponent,
        MessageItemComponent,
        HeaderItemComponent,
        ChatBoxComponent,
        ChatSendComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        ChatToolComponent,
        MessageItemComponent,
        HeaderItemComponent,
        ChatBoxComponent,
        ChatSendComponent
        ],
    providers: [],
    bootstrap: []
  })
  export class ChatModule { }
