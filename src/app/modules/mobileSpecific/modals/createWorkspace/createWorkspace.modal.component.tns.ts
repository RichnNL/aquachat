import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Store } from '@ngxs/store';
import { SetActionTitle } from '../../../../shared/ngxs/actions/ui.action';
import { Page } from 'tns-core-modules/ui/page/page';
import { registerElement } from 'nativescript-angular/element-registry';
import { TextField } from 'nativescript-material-textfield';
import { AquachatAPIService } from '~/app/core/services/aquachatAPI.service';
registerElement('MDTextField', () => TextField);
@Component({
    selector: 'app-create-workspace-modal',
    templateUrl: './createWorkspace.modal.component.html',
    styleUrls: ['./createWorkspace.modal.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class CreateWorkspaceModal {
    taken = false;
    name: string;
    text: string = '';
    helper: string = 'Name Taken';
    colour: string = 'blue';
    error: string = 'Enter a name';
    constructor( private _params: ModalDialogParams, private store: Store, private webAPI: AquachatAPIService) {
        this.store.dispatch(new SetActionTitle('Create a Workspace'));
        this.nameInValid();
    }

    type(text: string) {
        if (text.length > 0 && text.length < 30) {
            this.webAPI.getWorkspaceNameTaken(text).subscribe(result => {
                if (result) {
                    this.setNametaken();
                } else {
                    this.canCreateWorkspace();
                }
            });
        } else  {
            this.nameInValid();
        }
    }

    createWorkspace() {

    }

    onClose() {
       this._params.closeCallback();
    }

    private setNametaken() {
        this.taken = true;
        this.error = 'Name Taken';
        this.colour = 'red';
    }

    private canCreateWorkspace() {
        this.taken = false;
        this.error = 'Name Available';
        this.colour = 'green';
    }

    private nameInValid() {
        this.taken = true;
        this.error = 'Enter a valid name';
        this.colour = 'blue';
    }
}