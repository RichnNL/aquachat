import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Store } from '@ngxs/store';
import { SetCanGoBack } from '../../ngxs/actions/ui.action';
@Injectable()
export class RouterHelper {

    constructor(private router: RouterExtensions, private store: Store) {

    }

    goToHome() {
        this.router.navigate(['//home']);
    }

    goToDashboard() {
        this.router.navigate(['//dashboard']);
    }

    loggedIn() {
        this.router.navigate(['//dashboard'], {clearHistory: true});
        this.store.dispatch(new SetCanGoBack(false));
    }

    autoLogin() {}

    back() {
        this.router.backToPreviousPage();
    }

    canGoBack(): boolean {
        return this.router.canGoBack();
    }

    logOut() {
        this.store.dispatch(new SetCanGoBack(false));
        this.router.navigate(['//'], {clearHistory: true});
    }
}
