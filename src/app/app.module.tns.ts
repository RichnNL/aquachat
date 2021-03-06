import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from '../app/modules/home/home.module';
import { SharedModule } from '../app/shared/shared.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpLoaderFactory} from './config/language.config';
import {NgxsModule} from '@ngxs/store';
import { AuthenticationState } from '../app/shared/ngxs/state/authentication.state';
import { LanguageState } from '../app/shared/ngxs/state/language.state';
import {ApplicationStatusState} from '../app/shared/ngxs/state/status.state';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NativeScriptHttpModule} from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from './app.routes';
import {CommonModule} from '@angular/common';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { UIState } from './shared/ngxs/state/ui.state';
import { AzureInterceptorService } from './core/interceptor/azureInterceptor';
import { environment } from '../environments/environment';
import {MobileSpecificModule} from './modules/mobileSpecific/mobileSpecific.module';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SelectWorkspaceModal } from './modules/mobileSpecific/modals/selectWorkspace/selectWorkspace.modal.component.tns';
import { CreateWorkspaceModal } from './modules/mobileSpecific/modals/createWorkspace/createWorkspace.modal.component.tns';
import { LoadingModal } from './modules/mobileSpecific/modals/loadingModal/loading.modal.tns';
import { ChatStatusState } from './shared/ngxs/state/chat.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptUISideDrawerModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    CommonModule,
    MobileSpecificModule,
    NgxsModule.forRoot([
      AuthenticationState,
      LanguageState,
      ApplicationStatusState,
      UIState,
      ChatStatusState
    ], { developmentMode: environment.production }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AzureInterceptorService, multi: true}, ModalDialogService],
  entryComponents: [SelectWorkspaceModal, CreateWorkspaceModal, LoadingModal],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
