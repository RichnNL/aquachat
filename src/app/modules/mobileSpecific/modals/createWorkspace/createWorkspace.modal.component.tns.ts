import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Store, Select } from '@ngxs/store';
import { SetActionTitle } from '../../../../shared/ngxs/actions/ui.action';
import { Page } from 'tns-core-modules/ui/page/page';
import { registerElement } from 'nativescript-angular/element-registry';
import { TextField } from 'nativescript-material-textfield';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { Observable } from 'rxjs';
import {UserModel} from '../../../../shared/models/user.model';
import {ToastHelper} from '../../../../shared/helpers/toast/toast.helper';
import {SetMyWorkSpaces} from '../../../../shared/ngxs/actions/chat.action';
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
    userId: string;
    email: string;
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    constructor( private _params: ModalDialogParams, private store: Store, private webAPI: AquachatAPIService,
        private toast: ToastHelper) {
        this.store.dispatch(new SetActionTitle('Create a Workspace'));
        this.nameInValid();

        this.user$.subscribe((user) => {
            if (user.UserId != null) {
                this.userId = user.UserId;
                this.email = user.Email;
            }
        });
    }

    type(text: string) {
        this.text = text;
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

    createWorkspace() {
                this.webAPI.addWorkspace(this.userId, this.text, [], this.email ).subscribe((result) => {
                    this.toast.showMessage(result);
                    this.webAPI.getUserDetails(this.userId, this.email).subscribe((workspacemodels) => {
                        if (workspacemodels != null) {
                            this.store.dispatch(new SetMyWorkSpaces(workspacemodels));
                                   }
                    });
                    this.onClose();
                });
    }
}