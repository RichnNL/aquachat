import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
@Component({
    selector: 'app-loading-modal',
    templateUrl: './loading.modal.html',
    styleUrls: ['./loading.modal.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class LoadingModal {
    constructor( private _params: ModalDialogParams) {}

    onClose() {
       this._params.closeCallback();
    }
}
