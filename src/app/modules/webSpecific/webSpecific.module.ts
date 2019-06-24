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

@NgModule({
    declarations: [
        LoadingDialogComponent,
        ErrorDialogComponent,
        NavigationComponent,
        LanguageSelectorComponent,
        AddWorkspaceDialogComponent
    ],
    imports: [MaterialModule,
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
        LanguageSelectorComponent],
    providers: [],
    bootstrap: [],
    entryComponents: [LoadingDialogComponent, ErrorDialogComponent, AddWorkspaceDialogComponent],
  })
  export class WebSpecificModule { }
