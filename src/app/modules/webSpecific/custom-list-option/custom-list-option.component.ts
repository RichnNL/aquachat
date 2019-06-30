import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UIColorModel } from '../../../core/models/UIColor.Model';

@Component({
    selector: 'app-custom-list-option',
    templateUrl: './custom-list-option.component.html',
    styleUrls: ['./custom-list-option.component.scss'],
  })
  export class CustomListOptionComponent {
      fgColor: string;
      bgColor: string;
      colors = new UIColorModel();
      @Input() Name: string;
      @Input() Obj: any;
      @Output() clicked = new EventEmitter();
        constructor() {
            const index = Math.floor((Math.random() * 10) + 1);
            this.fgColor = this.colors.fgColor[index];
            this.bgColor = this.colors.bgColor[index];
        }

        itemClicked() {
        
        this.clicked.emit(this.Obj);
        
            
        }

  }