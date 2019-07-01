import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {UserDisplayModel} from '../../../../core/models/UserDisplay.Model';
import {UIColorModel} from '../../../../core/models/UIColor.Model';
import { InitialStylingValuesIndex } from '@angular/core/src/render3/interfaces/styling';
@Component({
    selector: 'app-header-item',
    templateUrl: './headerItem.component.html',
    styleUrls: ['./headerItem.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class HeaderItemComponent implements OnInit {
  
  @Input() Name: string;
  @Input() Obj: any;
  @Output() clicked = new EventEmitter();
  @Input() Initials: string;
  bgColor;
  fgColor;
  colors = new UIColorModel();
  initials: string;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.Name + 'Getshbjdbjd');
  
        const index = Math.floor((Math.random() * 10) + 1);
        this.fgColor = this.colors.fgColor[index];
        this.bgColor = this.colors.bgColor[index];
  }



    itemClicked() {
        this.clicked.emit(this.Obj);
    }
}