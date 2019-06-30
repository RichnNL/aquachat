import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {UserDisplayModel} from '../../../core/models/UserDisplay.Model';
import {UIColorModel} from '../../../core/models/UIColor.Model';
@Component({
    selector: 'app-custom-list-view-item',
    templateUrl: './listViewItem.component.html',
    styleUrls: ['./listViewItem.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class CustomListViewItemComponent implements OnInit {
  
  @Input() Name: string;
  @Input() Obj: any;
  @Output() clicked = new EventEmitter();
  bgColor;
  fgColor;
  colors = new UIColorModel();
  initials: string;
  constructor() {
  }

  ngOnInit(): void {
    const display = new UserDisplayModel();
    display.setDisplayName(this.Name);
        this.initials = display.initials;
        const index = Math.floor((Math.random() * 10) + 1);
        this.fgColor = this.colors.fgColor[index];
        this.bgColor = this.colors.bgColor[index];
  }



    itemClicked() {
        this.clicked.emit(this.Obj);
    }
}