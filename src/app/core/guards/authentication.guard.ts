import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable} from 'rxjs';
import {Store, Select} from '@ngxs/store';
import {AuthenticationState} from '../../shared/ngxs/state/authentication.state';
import { IsLoading } from '../../shared/ngxs/actions/appStatus.action';
import { RouterHelper } from '../../shared/helpers/router/router.helper';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    @Select(state => state.AuthenticationState.loggedIn) loggedIn$: Observable<boolean>;
    loggedIn = false;
    constructor(private router: RouterHelper) {
      this.loggedIn$.subscribe((result) => {
        this.loggedIn = result;
      });

    }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.loggedIn) {
          this.router.goToHome();
        }
        return this.loggedIn;
      }
}
