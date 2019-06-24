import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class ToastHelper {
    constructor(private snackBar: MatSnackBar) {
    }

    showMessage(message: string) {
            this.snackBar.open(message, '', {
              duration: 2000,
            });
    }
}