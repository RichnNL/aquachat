import {NgModule} from '@angular/core';
import {SplashComponent} from './components/splash/splash.component';
import {SharedModule} from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../webSpecific/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      SplashComponent,
      DashboardComponent,
    ],
    imports: [
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
