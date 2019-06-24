import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
@Injectable()
export class RouterHelper {

    constructor(private router: Router) {

    }

    goToHome() {
        this.router.navigate(['//home']);
    }

    goToDashboard() {
        this.router.navigate(['//dashboard']);
    }

    autoLogin() {
        this.goToDashboard();
    }
    loggedIn() {
        this.goToDashboard();
    }

    canGoBack(): boolean {
        return false;
    }

    back() {
        return;
    }

    logOut() {
        this.router.navigate(['//home']);
    }

}
