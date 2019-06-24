import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-tool',
  templateUrl: './chat-tool.component.html',
  styleUrls: ['./chat-tool.component.scss']
})
export class ChatToolComponent {
  @Input() chat: any;
  addUser = '../../../../../assets/media/add_user.svg';
  notification = '../../../../../assets/media/tempNotification.png';
  attach = '../../../../../assets/media/attach.svg';
  constructor() { }

  ngOnInit() {
  }

}
