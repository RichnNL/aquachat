import { LoadingDialogComponent } from './loading/loadingDialog.component';
import { ErrorDialogComponent } from './errorDialog/errorDialog.component';
import { NavigationComponent } from './navigation/navigation.component';
import {LanguageSelectorComponent} from './navigation/language-selector/language-selector.component';
import {NgModule} from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app/config/language.config';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddWorkspaceDialogComponent } from './addWorkspace/addWorkspaceDialog.component';
import { DropdownListModule } from 'ngx-dropdown-list';
import { CustomListOptionComponent } from './custom-list-option/custom-list-option.component';
import { AvatarModule } from 'ngx-avatar';
@NgModule({
    declarations: [
        LoadingDialogComponent,
        ErrorDialogComponent,
        NavigationComponent,
        LanguageSelectorComponent,
        AddWorkspaceDialogComponent,
        CustomListOptionComponent
    ],
    imports: [MaterialModule,
        AvatarModule,
        DropdownListModule,
        FormsModule,
         CommonModule,
         TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
          })],
    exports: [MaterialModule,
        LoadingDialogComponent,
        ErrorDialogComponent,
        NavigationComponent,
        AddWorkspaceDialogComponent,
        CustomListOptionComponent,
        LanguageSelectorComponent],
    providers: [],
    bootstrap: [],
    entryComponents: [LoadingDialogComponent, ErrorDialogComponent, AddWorkspaceDialogComponent],
  })
  export class WebSpecificModule { }
