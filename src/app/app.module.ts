import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HomeModule} from './modules/home/home.module';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationState } from './shared/ngxs/state/authentication.state';
import { LanguageState } from './shared/ngxs/state/language.state';
import { ApplicationStatusState } from './shared/ngxs/state/status.state';
import { UIState } from './shared/ngxs/state/ui.state';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './config/language.config';
import { AzureInterceptorService } from './core/interceptor/azureInterceptor';
import { WebSpecificModule } from './modules/webSpecific/webSpecific.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatStatusState } from './shared/ngxs/state/chat.state';
import { AvatarModule } from 'ngx-avatar';

const avatarColors = ['#FFB6C1', '#2c3e50', '#95a5a6', '#f39c12', '#1abc9c'];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AvatarModule.forRoot(
      {
        colors: avatarColors
      }
    ),
    BrowserModule,
    FormsModule,
    HomeModule,
    CommonModule,
    WebSpecificModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AzureInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
