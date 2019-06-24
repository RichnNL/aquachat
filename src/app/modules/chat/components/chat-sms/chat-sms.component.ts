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


  @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
  email: string;
  left: boolean;
  name = '';
  payload = '';
  constructor(private store: Store, private aquaAPI: AquachatAPIService) {
    this.user$.subscribe(user => {
      if (user && user.UserId.length > 0 && user.UserId !== 'undefined' && this.message) {
        this.email = user.Email;
        if (this.message.SenderEmail.includes(this.email)) {
            this.left = false;
            this.name = 'You';
        } else {
          this.left = true;
          this.name = this.message.SenderEmail;
        }

        this.payload = this.message.Payload;
      }
    });
   }

  ngOnInit() {}

}
