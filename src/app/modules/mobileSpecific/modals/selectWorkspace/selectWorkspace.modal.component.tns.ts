import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { UserModel } from '../../../../shared/models/user.model';
import { registerElement } from 'nativescript-angular/element-registry';
import { FilterSelect } from 'nativescript-filter-select';
import { Workspace } from '../../../../core/models/WorkspaceModel';
import { FilteredDropDown } from '../../../../core/models/FilterSelectDropDown.Model';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { ToastHelper } from '../../../../shared/helpers/toast/toast.helper';
import { SetMyWorkSpaces } from '../../../../shared/ngxs/actions/chat.action';
registerElement('FilterSelect', () => FilterSelect);

@Component({
    selector: 'app-select-workspace-modal',
    templateUrl: './selectWorkspace.modal.component.html',
    styleUrls: ['./selectWorkspace.modal.component.scss'],
    moduleId: module.id })
// tslint:disable-next-line:component-class-suffix
export class SelectWorkspaceModal implements OnInit {
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    @Select(state => state.ChatState.myWorkspaces) workspacesDetails$: Observable<WorkspaceDetailsModel[]>;
    userId: string;
    email: string;
    workspaces: Workspace[];
    workspacesAvailable = false;
    selectedWorkspace: {name: string, code: string};
    selected = false;
    // tslint:disable-next-line:max-line-length
    items;
    userWorkspaces: WorkspaceDetailsModel[] = WorkspaceDetailsModel[''];
    constructor( private _params: ModalDialogParams, private webAPI: AquachatAPIService,
        private toast: ToastHelper, private store: Store) {
        this.user$.subscribe((user) => {
            if (user.UserId != null) {
                this.userId = user.UserId;
                this.email = user.Email;
            }
        });
        this.workspacesDetails$.subscribe(details => {
            if (details != null) {
                this.userWorkspaces = details;
            }
        });
    }

    ngOnInit() {

        this.webAPI.getAllWorkspace(this.userId, ' ').subscribe(result => {
                   this.SetMyWorkSpaces(result, this.userWorkspaces);
           });
       }

    onClose() {
       this._params.closeCallback();
    }

    onitemselected(args) {
        if (args.selected != null) {

            this.selectedWorkspace = args.selected;
            this.selected = true;
        } else {
            this.selected = false;
        }
    }

    SetMyWorkSpaces(workspaces: Workspace[],  userWorkspaces: WorkspaceDetailsModel[]) {
        if (workspaces != null) {
            this.workspaces = workspaces;
            if (workspaces.length > 0) {
                this.workspacesAvailable = true;
            } else {
                this.workspacesAvailable = false;
            }
            this.workspaces.forEach((workspace) => {
                const index = userWorkspaces.findIndex((value) => value.Id === workspace.Id);
                if (index !== -1) {
                    this.workspaces.splice(index, 1);
                }
            });
            const filteredSelect = new FilteredDropDown();
            console.log(this.workspaces);
            filteredSelect.setItemsByWorkspaces(this.workspaces);
            this.items = filteredSelect.getItems();
            console.log(this.items);
        } else {
            this.workspacesAvailable = false;
        }
    }

    selectWorkspace() {
        console.log(this.selectedWorkspace);
            this.webAPI.addSelfToWorkspace(this.userId, this.email, this.selectedWorkspace.code).subscribe(result => {
                if (result.ErrorMessage.length === 0){
                    this.toast.showMessage('Joined ' + this.selectedWorkspace.name);
                    this.webAPI.getUserDetails(this.userId, this.email).subscribe((workspacemodels) => {
                        if (workspacemodels != null) {
                            this.store.dispatch(new SetMyWorkSpaces(workspacemodels));
                        }
                    });
                 } else {
                    this.toast.showMessage(result.ErrorMessage[0]);
                 }

                this.onClose();
            });

        }
}
