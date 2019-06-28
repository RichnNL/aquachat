import {NgModule} from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SplashComponent} from './components/splash/splash.component';
import {SharedModule} from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChatModule } from '../chat/chat.module';
import { MobileSpecificModule } from '../mobileSpecific/mobileSpecific.module';
@NgModule({
    declarations: [
      SplashComponent,
      DashboardComponent,
   ],
    imports: [
      ChatModule,
      CommonModule,
      MobileSpecificModule,
      SharedModule],
  })
  export class HomeModule { }