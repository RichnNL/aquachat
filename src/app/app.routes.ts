import { Routes } from '@angular/router';
import { SplashComponent } from './modules/home/components/splash/splash.component';
import {DashboardComponent} from './modules/home/components/dashboard/dashboard.component';
import {AuthenticationGuard} from './core/guards/authentication.guard';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: SplashComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
