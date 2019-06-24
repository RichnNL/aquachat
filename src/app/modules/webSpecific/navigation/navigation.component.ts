import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { LogInUser, SetLoggedIn } from '../../../shared/ngxs/actions/authentication.action';
import { RouterHelper } from '../../../shared/helpers/router/router.helper';
import { UserModel } from '../../../shared/models/user.model';
import { AzureService } from '../../../core/authentication/azure.service';





@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
  })
  export class NavigationComponent implements OnDestroy {

    @Select(state => state.AuthenticationState.loggedIn) loggedIn$: Observable<boolean>;
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    sideNavOpen = false;
    sideIcon = '../../../../assets/icons/burgerNotSelected.svg';
    displayName = '';

    userSubscription: Subscription;

    constructor(private store: Store, private router: RouterHelper, private azure: AzureService) {
     this.userSubscription = this.user$.subscribe((result) => {
        if (result.UserId) {
          if (result.DisplayName) {
            this.displayName = result.DisplayName;
          } else if (result.LastName) {
            this.displayName = result.LastName;
          } else {
            this.displayName = '';
          }

        } else {
          this.displayName = '';
        }
      });
    }

    toggleSideNav() {
        this.sideNavOpen = !this.sideNavOpen;
        if (this.sideNavOpen) {
          this.sideIcon =  '../../../../assets/icons/burgerSelected.svg';
        } else {
          this.sideIcon =  '../../../../assets/icons/burgerNotSelected.svg';
        }
    }

    loginClicked() {
      this.store.dispatch(new LogInUser());
    }

    homeClicked() {
      this.router.goToHome();
    }

    profileClicked() {
      this.azure.editProfile();
    }

    logoutClicked() {
      this.store.dispatch(new SetLoggedIn(false));
    }

    ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
    }

}

