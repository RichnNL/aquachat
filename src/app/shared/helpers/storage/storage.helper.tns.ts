import { Injectable } from '@angular/core';
import { isAndroid, isIOS, device, screen } from 'tns-core-modules/platform';
import { TokenModel } from '../../models/token.model';


@Injectable()
export class StorageHelper {
  localstorage = require( 'nativescript-localstorage' );
    constructor() {
    }

    setObject(name: string, obj: any) {
      this.localstorage.setItem(name, JSON.stringify(obj));
  }

  setVariable(name: string, variable: any) {
      this.localstorage.setItem(name, variable);
  }

  getVariable(name: string): any {
      return this.localstorage.getItem(name);
  }

  getObject(name: string): any {
      return JSON.parse(this.localstorage.getItem(name));
     }

  getDeviceLanguage(): string {
    const local: string = this.getVariable('lang');
    try {
      if (local) {
      if (local.length > 1) {
          return local;
      }
      }} catch (error) {}
       return device.language;
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
