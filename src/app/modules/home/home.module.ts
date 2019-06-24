import {NgModule} from '@angular/core';
import {SplashComponent} from './components/splash/splash.component';
import {SharedModule} from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../webSpecific/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatModule } from '../chat/chat.module';
import {MenuModule} from '../menu/menu.module';
@NgModule({
    declarations: [
      SplashComponent,
      DashboardComponent,
    ],
    imports: [
      ChatModule,
      MenuModule,
      SharedModule,
      CommonModule,
      MaterialModule,
      FormsModule,
    ],
    exports: [],
    providers: [],
    bootstrap: []
  })
  export class HomeModule { }
