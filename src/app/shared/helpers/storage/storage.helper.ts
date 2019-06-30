import { Injectable } from '@angular/core';
import { TokenModel } from '../../models/token.model';


@Injectable()
export class StorageHelper {
    loadingDialog: any;
    
    constructor() {
    }

    setObject(name: string, obj: any) {
        localStorage.setItem(name, JSON.stringify(obj));
    }

    setVariable(name: string, variable: any) {
        localStorage.setItem(name, variable);
    }

    getVariable(name: string): any {
        return localStorage.getItem(name);
    }

    getObject(name: string): any {
      const obj = localStorage.getItem(name);
      if (obj !== 'undefined') {
        return JSON.parse(obj);
      } else {
        return null;
      }
    }

    getDeviceLanguage(): string {
      const local: string = this.getVariable('lang');
      try {
          if (local) {
          if (local.length > 1) {
            return local;
          }
        }} catch (error) {}
        return navigator.language;
    }

    getTokenFromDevice(): TokenModel {
      try {
        const token: TokenModel = this.getObject('azureToken');
        return token;
      } catch (error) {
        return new TokenModel('', 'error');
      }
    }
}

