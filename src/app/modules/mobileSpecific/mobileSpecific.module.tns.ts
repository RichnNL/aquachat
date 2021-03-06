import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../config/language.config';
import { HttpClient } from '@angular/common/http';
import {LoadingModal} from './modals/loadingModal/loading.modal.tns';
import {SelectWorkspaceModal} from './modals/selectWorkspace/selectWorkspace.modal.component.tns';
import {CreateWorkspaceModal} from './modals/createWorkspace/createWorkspace.modal.component.tns';
import {HideActionBarDirective} from './directives/hidden.actionbar.component.tns';
import {ActionBarDirective} from './directives/actionbar.component.tns';
import {SideDrawerComponent} from './sideDrawer/sideDrawer.component.tns';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    declarations: [
       LoadingModal,
       SelectWorkspaceModal,
       CreateWorkspaceModal,
       ActionBarDirective,
       HideActionBarDirective,
       SideDrawerComponent,
    ],
    imports: [
        CommonModule,
        MenuModule,
         TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
          })],
    exports: [
        SelectWorkspaceModal,
        CreateWorkspaceModal,
        LoadingModal,
        ActionBarDirective,
        HideActionBarDirective,
        SideDrawerComponent
    ],
    providers: [],
    bootstrap: []
  })
  export class MobileSpecificModule { }
