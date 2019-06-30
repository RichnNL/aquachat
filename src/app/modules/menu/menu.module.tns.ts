import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SideMenuComponent } from './components/sideMenu/sideMenu.component';
import { ProfileIconComponent } from './components/profileIcon/profileIcon.component';
import { AvailableComponent } from './components/available/available.component';
import { CurrentWorkspaceComponent } from './components/currentWorkspace/currentWorkspace.component';
import {CustomListViewItemComponent} from '../mobileSpecific/listViewItem/listViewItem.component.tns';
import { SelectListComponent } from './components/selectList/selectList.component';
import { NotificationComponent } from './components/notification/notification.component';
import {SharedModule} from '../../shared/shared.module';
import {NotificationImageComponent} from '../mobileSpecific/notificationImage/notificationImage.component.tns';
@NgModule({
    declarations: [
        ProfileIconComponent,
        AvailableComponent,
        CurrentWorkspaceComponent,
        CustomListViewItemComponent,
        NotificationComponent,
        NotificationImageComponent,
        SelectListComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        NotificationImageComponent,
        ProfileIconComponent,
        CurrentWorkspaceComponent,
        CustomListViewItemComponent,
        NotificationComponent,
        SelectListComponent,
        AvailableComponent ],
    providers: [],
    bootstrap: []
  })
  export class MenuModule { }
