import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification-image',
    templateUrl: './notificationImage.component.html',
    styleUrls: ['./notificationImage.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class NotificationImageComponent implements OnInit {
  
  @Input() ImageLocation: string;
  @Input() Count: number;
  @Input() Size: number;
  @Input() Background: string;
  @Output() clicked = new EventEmitter();
  text: string;
  left: string;
  textColor =  'white';
  backColor = 'red';
  constructor() {
  }

  ngOnInit(): void {
    this.text = this.Count.toString();
    const half = (this.Size / 2);
    const quarter = (half / 2);
    const eigth = (quarter / 2 );
    this.left = (half + eigth ).toString();
  }



    itemClicked() {
        this.clicked.emit();
    }
}