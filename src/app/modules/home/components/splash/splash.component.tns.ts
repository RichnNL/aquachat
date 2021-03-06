import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RouterHelper } from '../../../../shared/helpers/router/router.helper';
import { LogInUser } from '../../../../shared/ngxs/actions/authentication.action';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent  {
   
    @Select(state => state.AuthenticationState.loggedIn) loggedIn$: Observable<boolean>;
   
    exitMainPage = false;
    constructor(private router: RouterHelper, private store: Store) {
        this.loggedIn$.subscribe((loggedIn) => {
            if (loggedIn && !this.exitMainPage) {
                this.exitMainPage = true;
                this.router.loggedIn();
            }
        });
    }
    login() {
        this.store.dispatch(new LogInUser());
    }

}
