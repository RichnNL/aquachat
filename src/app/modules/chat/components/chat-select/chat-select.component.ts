import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-select',
  templateUrl: './chat-select.component.html',
  styleUrls: ['./chat-select.component.scss']
})
export class ChatSelectComponent {
  @Input() chat: any;
  constructor() { }

  ngOnInit() {
  }

}
