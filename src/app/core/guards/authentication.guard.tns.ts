import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor() {
    }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return true;
      }
}
