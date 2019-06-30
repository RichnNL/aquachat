import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { DialogHelper } from '../../../../shared/helpers/dialog/dialog.helper';
import { SetActionTitle } from '../../../../shared/ngxs/actions/ui.action';
import { StorageHelper } from '../../../../shared/helpers/storage/storage.helper';
import { AuthenticationState } from '../../../../shared/ngxs/state/authentication.state';
import { SetMyWorkSpaces } from '../../../../shared/ngxs/actions/chat.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(state => state.ChatState.currentWorkspace) currentWorkspaces$: Observable<WorkspaceDetailsModel>;
  @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
  @Select(state => state.AuthenticationState.loggedIn) loggedIn$: Observable<boolean>;
  workspacename: string = '';
  workspaceSubscription: Subscription;
  open = false;
  noWorkspaces = true;
  myWorkpsace
  constructor(private webAPIService: AquachatAPIService, private dialogHelper: DialogHelper,
    private viewContainerRef: ViewContainerRef, private store: Store, private storage: StorageHelper) {
              const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
              const userEmail = this.store.selectSnapshot(AuthenticationState).user.Email;
              this.webAPIService.getUserDetails(userId, userEmail).subscribe((result) => {
                  this.store.dispatch(new SetMyWorkSpaces(result));
              });
    this.sideOpen$.subscribe((isOpen) => {
      this.open = isOpen;
    });

   this.workspaceSubscription = this.currentWorkspaces$.subscribe((result) => {
    if (result != null) {
      if (result.Name.length > 0) {
        this.workspacename = result.Name;
        this.store.dispatch(new SetActionTitle(result.Name));
      }

      this.noWorkspaces = false;

    }  else {
      this.noWorkspaces = true;
      this.workspacename = 'Select a Workspace';
      this.store.dispatch(new SetActionTitle(this.workspacename));
    }
    });
   }

   showJoin() {
     this.dialogHelper.openSelectWorkspaceDialog(this.viewContainerRef);
    }

   showCreate() {
     this.dialogHelper.openCreateWorkspaceDialog(this.viewContainerRef);
    }

   showWorkspaceOptions() {
    this.dialogHelper.openWorkspaceDialog();
   }
  ngOnInit() {

   }

  ngOnDestroy(): void {
    this.workspaceSubscription.unsubscribe();
  }
}
