import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetCurrentWorkspace } from '../../../../shared/ngxs/actions/chat.action';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { DialogHelper } from '../../../../shared/helpers/dialog/dialog.helper';
import { ToggleWorkspaces } from '../../../../shared/ngxs/actions/ui.action';


@Component({
  selector: 'app-current-workspace',
  templateUrl: './currentWorkspace.component.html',
  styleUrls: ['./currentWorkspace.component.scss']
})
export class CurrentWorkspaceComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.ChatState.currentWorkspace) current$: Observable<WorkspaceDetailsModel>;
    @Select(state => state.ChatState.myWorkspaces) workspaces$: Observable<WorkspaceDetailsModel[]>;
    open;
    currentSubscription: Subscription;
    currentWorkspace: WorkspaceDetailsModel;
    location = '../../../../../assets/media/back_grey_down.png';
    hasWorkspaces = false;
    expanded = false;
    canExpand = false;
    constructor(private store: Store, private dialogHelper: DialogHelper) {
      this.sideOpen$.subscribe((isOpen) => {
        this.open = isOpen;
    });
    this.workspaces$.subscribe((workspaces) => {
      if (workspaces) {
        if (workspaces.length > 0) {
          this.hasWorkspaces = true;
          this.currentSubscription =  this.current$.subscribe((current) => {

            if (!current) {
              this.store.dispatch(new SetCurrentWorkspace(workspaces[0]));
              this.currentWorkspace = workspaces[0];
            } else {
              this.currentWorkspace = current;
            }

            if (workspaces.length === 1) {
              this.canExpand = false;
            } else {
              this.canExpand = true;
            }
         });
         return;
        }
        return;
        }
        this.hasWorkspaces = false;
    });
    }

    addWorkspace() {
      this.dialogHelper.openWorkspaceDialog();
    }

    editWorkspace() {

    }

    expandWorkspace() {
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
      }
      if (this.expanded) {
        this.location = '../../../../../assets/media/back_grey_up.png';
      } else {
        this.location = '../../../../../assets/media/back_grey_down.png';
      }
      this.store.dispatch(new ToggleWorkspaces());
    }
}