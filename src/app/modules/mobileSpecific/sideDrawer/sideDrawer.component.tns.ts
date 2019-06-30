import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-side-drawer',
    templateUrl: './sideDrawer.component.html',
    styleUrls: ['./sideDrawer.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class SideDrawerComponent {

    constructor(private store: Store) {
     
    }

   
}