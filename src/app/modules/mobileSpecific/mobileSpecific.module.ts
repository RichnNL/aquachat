import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/config/language.config';
import { HttpClient } from '@angular/common/http';
import {LoadingModal} from './modals/loadingModal/loading.modal.tns';
import {SelectWorkspaceModal} from './modals/selectWorkspace/selectWorkspace.modal.component.tns';
import {CreateWorkspaceModal} from './modals/createWorkspace/createWorkspace.modal.component.tns';
@NgModule({
    declarations: [
       LoadingModal,
       SelectWorkspaceModal,
       CreateWorkspaceModal,
    ],
    imports: [
        CommonModule,
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
    ],
    providers: [],
    bootstrap: []
  })
  export class MobileSpecificModule { }
