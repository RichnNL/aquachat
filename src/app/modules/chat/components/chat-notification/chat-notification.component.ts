import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-chat-notification',
  templateUrl: './chat-notification.component.html',
  styleUrls: ['./chat-notification.component.scss']
})
export class ChatNotificationComponent {

  location = '../../../../../assets/media/tempNotification.png';
  constructor() { }

  ngOnInit() { }

}
