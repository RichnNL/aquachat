import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {UserDisplayModel} from '../../../../core/models/UserDisplay.Model';
import {UIColorModel} from '../../../../core/models/UIColor.Model';
@Component({
    selector: 'app-message-item',
    templateUrl: './messageItem.component.html',
    styleUrls: ['./messageItem.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class MessageItemComponent implements OnInit {
  
  @Input() Name: string;
  @Input() Obj: any;
  @Input() Payload: string;
  bgColor = 'blue';
  fgColor = 'white';
  colors = new UIColorModel();
  initials: string;
  constructor() {
  }

  ngOnInit(): void {
    const display = new UserDisplayModel();
    display.setDisplayName(this.Name);
        this.initials = display.initials;
  }
}