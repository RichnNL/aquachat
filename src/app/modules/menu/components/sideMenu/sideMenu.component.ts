import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ToggleSideNav } from '../../../../shared/ngxs/actions/ui.action';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { SetCurrentWorkspace, AddUserToChat } from '../../../../shared/ngxs/actions/chat.action';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sideMenu.component.html',
  styleUrls: ['./sideMenu.component.scss']
})
export class SideMenuComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.UIState.showWorkspaces) showWorkspaces$: Observable<boolean>;
    @Select(state => state.ChatState.myWorkspaces) workspaces$: Observable<WorkspaceDetailsModel[]>;
    @Select(state => state.ChatState.selectedUsers) selected$: Observable<OtherUserModel[]>;
    @Select(state => state.ChatState.currentWorkspace) current$: Observable<WorkspaceDetailsModel>;
    open = false;
    location;
    allWorkspaces: WorkspaceDetailsModel[];
    filteredWorkspaces: WorkspaceDetailsModel[];
    expand = false;
    users: OtherUserModel[];
    currentWorkspaceName: string;
    constructor(private store: Store, private webAPI:  AquachatAPIService) {
        this.sideOpen$.subscribe((isOpen) => {
        this.current$.subscribe((current) => {
          if (current) {
            this.users = [];
            this.currentWorkspaceName = current.Name;
            if (current.Users) {
              current.Users.forEach(user => {
                const temp = new OtherUserModel();
                temp.Email = user.Email;
                if (user.DisplayName) {
                  temp.DisplayName = user.DisplayName;
                }
                this.users.push(temp);
              });
            }
            if (this.allWorkspaces !== null) {
              if (this.allWorkspaces.length > 0) {
                this.filteredWorkspaces = this.allWorkspaces.filter(function(value, index, arr) {

                  return value.Id !== current.Id;
                });
              }
            }
          }
        });

          try {
            this.open = isOpen;
            if (!this.open) {
              this.location = '../../../../assets/media/double-angle-right.svg';
            } else {
              this.location = '../../../../assets/media/double-angle-left.svg';
            }
          } catch {

          }
        });

        this.workspaces$.subscribe((w) => {
          this.allWorkspaces = w;
        });

        this.showWorkspaces$.subscribe((show) => {
          this.expand = show;
        });
 }

    toggleSideNav() {
     this.store.dispatch(new ToggleSideNav());
    }



    selectedWorkspace(workspace) {
      this.store.dispatch(new SetCurrentWorkspace(workspace));
    }

    userSelected(other: OtherUserModel) {
       this.store.dispatch(new AddUserToChat(other));
    }

    
}