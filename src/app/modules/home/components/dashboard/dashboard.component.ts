import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { DialogHelper } from '../../../../shared/helpers/dialog/dialog.helper';
import { SetActionTitle } from '../../../../shared/ngxs/actions/ui.action';
import { StorageHelper } from '../../../../shared/helpers/storage/storage.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(state => state.ChatState.currentWorkspace) currentWorkspaces$: Observable<WorkspaceDetailsModel>;
  @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;

  workspacename: string = '';
  workspaceSubscription: Subscription;
  open = false;
  noWorkspaces = true;
  constructor(private webAPIService: AquachatAPIService, private dialogHelper: DialogHelper,
    private viewContainerRef: ViewContainerRef, private store: Store, private storage: StorageHelper) {


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
  ngOnInit() { }

  ngOnDestroy(): void {
    this.workspaceSubscription.unsubscribe();
  }
}
