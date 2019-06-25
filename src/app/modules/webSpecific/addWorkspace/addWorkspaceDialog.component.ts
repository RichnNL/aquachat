import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AquachatAPIService } from '../../../core/services/aquachatAPI.service';
import { Workspace } from '../../../core/models/WorkspaceModel';
import { ToastHelper } from '../../../shared/helpers/toast/toast.helper';
import { Store } from '@ngxs/store';
import { AuthenticationStateModel, ChatStateModel } from '../../../shared/ngxs/state/state.model.collection';
import { SetMyWorkSpaces } from '../../../shared/ngxs/actions/chat.action';
import { WorkspaceDetailsModel } from '../../../core/models/WorkspaceDetailsModel';
import { AuthenticationState } from '../../../shared/ngxs/state/authentication.state';
import { ChatStatusState } from '../../../shared/ngxs/state/chat.state';



@Component({
    selector: 'app-workspace',
    templateUrl: './addWorkspaceDialog.component.html',
    styleUrls: ['./addWorkspaceDialog.component.scss'],
  })
  export class AddWorkspaceDialogComponent implements OnInit {
    name: string;
    workspaces: Workspace[];
    constructor(private dialogRef: MatDialogRef<AddWorkspaceDialogComponent>,
        private aquachatAPI: AquachatAPIService,
        private toast: ToastHelper,
        @Inject(MAT_DIALOG_DATA) public data: string, private store: Store) {
            const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
            const userWorkspaces: WorkspaceDetailsModel[]  = this.store.selectSnapshot(ChatStatusState).myWorkspaces;
            
            this.aquachatAPI.getAllWorkspace(userId).subscribe(result => {
                this.workspaces = result;
                if (userWorkspaces != null) {
                    this.workspaces.forEach((workspace) => {
                        const index = userWorkspaces.findIndex((value) => value.Id === workspace.Id);
                        if (index !== -1) {
                            this.workspaces.splice(index, 1);
                        }
                    });
                }
            });
        }

    ngOnInit() {}

    onCancelClick(): void {
    this.dialogRef.close();
    }

    createWorkspace() {
        if (this.name) {
            if (this.name.length > 3) {
                const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
                const userEmail = this.store.selectSnapshot(AuthenticationState).user.Email;
                this.aquachatAPI.addWorkspace(userId, this.name, [], userEmail ).subscribe((result) => {
                    this.toast.showMessage(result);
                    this.aquachatAPI.getUserDetails(userId, userEmail).subscribe((workspacemodels)=> {
                        if (workspacemodels != null){
                            this.store.dispatch(new SetMyWorkSpaces(workspacemodels));
                        }
                    });
                    this.dialogRef.close();
                });
            }
        }
    }
    selectedWorkspace(workspace: Workspace) {
        const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
        const userEmail = this.store.selectSnapshot(AuthenticationState).user.Email;

        this.aquachatAPI.addSelfToWorkspace(userId, userEmail, workspace.Id).subscribe((result) => {
            if (result.ErrorMessage.length === 0){
                this.toast.showMessage('Added to Workspace');
            } else {
                this.toast.showMessage('Could not add to Workspace');
            }
        });
        this.dialogRef.close();
    }


}
