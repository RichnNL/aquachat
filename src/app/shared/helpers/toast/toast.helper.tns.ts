import * as Toast from 'nativescript-toast';
import { Injectable } from '@angular/core';
@Injectable()
export class ToastHelper {
    constructor() {
    }

    showMessage(message: string) {
        Toast.makeText(message).show();
    }
}