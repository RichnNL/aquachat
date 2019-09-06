import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';
import { MessageModel } from '../../../../core/models/MessageModel';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { UserModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-chat-sms',
  templateUrl: './chat-sms.component.html',
  styleUrls: ['./chat-sms.component.scss']
})
export class ChatSMSComponent {
  @Input() message: MessageModel;
 @Input() bgColor: string;
 @Input() fgColor: string;
  
  name = '';
  payload = '';
  constructor(private store: Store, private aquaAPI: AquachatAPIService) {}

  ngOnInit() {
    this.payload = this.message.Payload;
    this.name = this.message.SenderEmail;
  }

}
