import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AquachatAPIService } from '../../../core/services/aquachatAPI.service';
import { Workspace } from '../../../core/models/WorkspaceModel';
import { ToastHelper } from '../../../shared/helpers/toast/toast.helper';
import { Store, Select } from '@ngxs/store';
import { SetMyWorkSpaces } from '../../../shared/ngxs/actions/chat.action';
import { WorkspaceDetailsModel } from '../../../core/models/WorkspaceDetailsModel';
import { AuthenticationState } from '../../../shared/ngxs/state/authentication.state';
import { Observable } from 'rxjs';
import { NgDropList, Item } from '../../../core/models/NgDropDownList.Model';
import { UserModel } from '../../../shared/models/user.model';

@Component({
    selector: 'app-workspace',
    templateUrl: './addWorkspaceDialog.component.html',
    styleUrls: ['./addWorkspaceDialog.component.scss'],
  })
  export class AddWorkspaceDialogComponent implements OnInit {
    name: string;
    workspaces: Workspace[];
    selectedWorkspace: Workspace;
    chosen = false;
    typed = false;
    filteredWorkspaces: Workspace[];
    hintMessage = 'Enter a Workspace Name';
    nameTaken = false;
    search: string;
    workspacesAvailable = false;
    workspaceOptions: Item[];
    userId: string;
    email: string;
    userWorkspaces: WorkspaceDetailsModel[] = WorkspaceDetailsModel[''];


    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    @Select(state => state.ChatState.myWorkspaces) workspacesDetails$: Observable<WorkspaceDetailsModel[]>;
    constructor(private dialogRef: MatDialogRef<AddWorkspaceDialogComponent>,
        private aquachatAPI: AquachatAPIService,
        private toast: ToastHelper,
        @Inject(MAT_DIALOG_DATA) public data: string, private store: Store) {
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
     this.aquachatAPI.getAllWorkspace(this.userId, ' ').subscribe(result => {
                this.SetMyWorkSpaces(result, this.userWorkspaces);
        });
    }

    enteredValue() {
        if (this.name) {
            if (this.name.length > 3) {
                this.hintMessage = 'Create New Workspace';
                this.typed = true;
            } else {
                this.hintMessage = 'Enter a Workspace Name';
                this.typed = false;
            }
        }
        if (this.typed) {
           this.aquachatAPI.getWorkspaceNameTaken(this.name).subscribe((exists) => {
                this.nameTaken = exists;
            });
        }
    }

    onCancelClick(): void {
    this.dialogRef.close();
    }

    createWorkspace() {
        if (this.name) {
            if (this.name.length > 3) {
                this.aquachatAPI.addWorkspace(this.userId, this.name, [], this.email ).subscribe((result) => {
                    this.toast.showMessage(result);
                    this.aquachatAPI.getUserDetails(this.userId, this.email).subscribe((workspacemodels) => {
                        if (workspacemodels != null) {
                            this.store.dispatch(new SetMyWorkSpaces(workspacemodels));
                        }
                    });
                    this.dialogRef.close();
                });
            }
        }
    }

    join() {
        if (this.workspacesAvailable) {
            this.aquachatAPI.addSelfToWorkspace(this.userId, this.email, this.selectedWorkspace.Id).subscribe((result) => {
                if (result.ErrorMessage.length === 0){
                    this.toast.showMessage('Joined Workspace');
                    this.aquachatAPI.getUserDetails(this.userId, this.email).subscribe((workspacemodels) => {
                        if (workspacemodels != null) {
                            this.store.dispatch(new SetMyWorkSpaces(workspacemodels));
                        }
                    });
                } else {
                    this.toast.showMessage('Could not add to Workspace');
                }
            });
            this.dialogRef.close();
        }
    }

    searchKeyDown() {
        const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
        this.aquachatAPI.getAllWorkspace(userId, this.search).subscribe(workspaces => {
            this.SetMyWorkSpaces(workspaces, this.userWorkspaces);
        });
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

                    const droplist = new NgDropList();
                    droplist.setItemsByWorkspaces(this.workspaces);
                    this.workspaceOptions = droplist.getItems();
        } else {
            this.workspacesAvailable = false;
        }
    }


}

