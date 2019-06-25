import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
@Component({
    selector: 'app-create-workspace-modal',
    templateUrl: './createWorkspace.modal.component.html',
    styleUrls: ['./createWorkspace.modal.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class CreateWorkspaceModal {
    constructor( private _params: ModalDialogParams) {}

    onClose() {
       this._params.closeCallback();
    }
}