import { Component, ViewContainerRef} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetCurrentWorkspace } from '../../../../shared/ngxs/actions/chat.action';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { DialogHelper } from '../../../../shared/helpers/dialog/dialog.helper';
import { ToggleWorkspaces } from '../../../../shared/ngxs/actions/ui.action';
import { UIColorModel } from '../../../../core/models/UIColor.Model';


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
    currentWorkspace: WorkspaceDetailsModel;
    allWorkspaces: WorkspaceDetailsModel[];
    filteredWorkspaces: WorkspaceDetailsModel[] = [];
    location = '../../../../../assets/media/back_grey_down.png';
    locationMobile = 'res://back_blue_down';
    hasWorkspaces = false;
    expanded = false;
    canExpand = false;
    colors = new UIColorModel();
    name = '';
    
    constructor(private viewContainerRef: ViewContainerRef, private store: Store, private dialogHelper: DialogHelper) {
      this.sideOpen$.subscribe((isOpen) => {
        this.open = isOpen;
    });

    this.workspaces$.subscribe((workspaces) => {
      if (workspaces != null) {
        if (workspaces.length > 0) {
          this.hasWorkspaces = true;
          this.allWorkspaces = workspaces;
          this.current$.subscribe((current) => {

            if (current == null) {
              this.store.dispatch(new SetCurrentWorkspace(workspaces[0]));
              this.currentWorkspace = workspaces[0];
            } else {
              this.currentWorkspace = current;
            }
            this.name = this.currentWorkspace.Name;
            if (workspaces.length === 1) {
              this.canExpand = false;
            } else {
              this.canExpand = true;
            }

            if (this.allWorkspaces !== null) {
              if (this.allWorkspaces.length > 0) {
                this.filteredWorkspaces = this.allWorkspaces.filter(value => {
                 return this.currentWorkspace.Id !== value.Id;
                });
              }
            }
         });
         return;
        }
        }
        this.hasWorkspaces = false;
        this.name = 'No Workspaces';
    });
  }

    addWorkspace() {
      this.dialogHelper.openWorkspaceDialog();
    }

    joinWorkspace() {
      this.dialogHelper.openSelectWorkspaceDialog(this.viewContainerRef);
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
        this.locationMobile = 'res://back_blue_up';
      } else {
        this.location = '../../../../../assets/media/back_grey_down.png';
        this.locationMobile = 'res://back_blue_down';
      }
      this.store.dispatch(new ToggleWorkspaces());
    }



    selectWorkspace(workspace) {
      this.store.dispatch(new SetCurrentWorkspace(workspace));
    }
}