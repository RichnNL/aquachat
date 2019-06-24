import {NgModule} from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SplashComponent} from './components/splash/splash.component';
import { HideActionBarDirective } from '../mobileSpecific/directives/hidden.actionbar.component.tns';
import {ActionBarDirective} from '../mobileSpecific/directives/actionbar.component.tns';
import {SharedModule} from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChatModel } from '../../core/models/ChatModel';
@NgModule({
    declarations: [
      SplashComponent,
      DashboardComponent,
      HideActionBarDirective,
      ActionBarDirective],
    imports: [
      ChatModel,
      CommonModule,
      SharedModule],
  })
  export class HomeModule { }