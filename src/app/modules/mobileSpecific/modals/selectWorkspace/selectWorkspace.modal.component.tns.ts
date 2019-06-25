import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
@Component({
    selector: 'app-select-workspace-modal',
    templateUrl: './selectWorkspace.modal.component.html',
    styleUrls: ['./selectWorkspace.modal.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class SelectWorkspaceModal {
    constructor( private _params: ModalDialogParams) {}

    onClose() {
       this._params.closeCallback();
    }
}