import { Routes } from '@angular/router';
import { SplashComponent } from './modules/home/components/splash/splash.component';
import {DashboardComponent} from './modules/home/components/dashboard/dashboard.component';
import {AuthenticationGuard} from './core/guards/authentication.guard';
import { CreateWorkspaceModal } from './modules/mobileSpecific/modals/createWorkspace/createWorkspace.modal.component.tns';
import { SelectWorkspaceModal } from './modules/mobileSpecific/modals/selectWorkspace/selectWorkspace.modal.component.tns';

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
    canActivate: [AuthenticationGuard],
    children: [
      {
          path: 'createworkspace', component: CreateWorkspaceModal
      },
      {
        path: 'selectworkspace', component: SelectWorkspaceModal
      }
  ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
