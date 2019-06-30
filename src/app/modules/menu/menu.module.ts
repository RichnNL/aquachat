import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from './components/sideMenu/sideMenu.component';
import { ProfileIconComponent } from './components/profileIcon/profileIcon.component';
import { AvailableComponent } from './components/available/available.component';
import { CurrentWorkspaceComponent } from './components/currentWorkspace/currentWorkspace.component';
import { MaterialModule } from '../webSpecific/material.module';
import { ChatModule } from '../chat/chat.module';
import { SelectListComponent } from './components/selectList/selectList.component';
import { AvatarModule } from 'ngx-avatar';
import { NotificationComponent } from './components/notification/notification.component';
import { DropdownListModule } from 'ngx-dropdown-list';
import { WebSpecificModule } from '../webSpecific/webSpecific.module';

@NgModule({
    declarations: [
        SideMenuComponent,
        ProfileIconComponent,
        AvailableComponent,
        CurrentWorkspaceComponent,
        SelectListComponent,
        NotificationComponent
    ],
    imports: [
        DropdownListModule,
        FormsModule,
        CommonModule,
        MaterialModule,
        ChatModule,
        AvatarModule,
        WebSpecificModule
    ],
    exports: [
        SideMenuComponent,
        NotificationComponent,
        CurrentWorkspaceComponent,
        ProfileIconComponent,
        AvailableComponent  ],
    providers: [],
    bootstrap: []
  })
  export class MenuModule { }
