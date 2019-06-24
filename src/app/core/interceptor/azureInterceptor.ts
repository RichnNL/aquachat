import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { TokenModel } from '../../shared/models/token.model';
import { Select, Store } from '@ngxs/store';

@Injectable()
export class AzureInterceptorService implements HttpInterceptor {
    @Select(state => state.AuthenticationState.currentToken) token$: Observable<TokenModel>;

    options: HttpHeaders = new HttpHeaders();
    token = '';

    constructor(private http: HttpClient, private store: Store) {
        this.token$.subscribe((result) => {
            this.token = result.token;
        });
    }
    intercept(req: HttpRequest<any>, handler: HttpHandler) {
        if (this.token) {
           this.options = this.options.set('Authorization', 'Bearer ' + this.token);
         }
         this.options = this.options.set('Content-type', 'application/json');

       const editedRequest = req.clone({
           headers: this.options
       });
        return handler.handle(editedRequest);
    }

}