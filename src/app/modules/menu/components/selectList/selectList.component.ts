import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { ChannelDetailsModel } from '../../../../core/models/ChannelDetailsModel';
import { WorkspaceUserModel } from '../../../../core/models/WorkspaceUserModel';
import { SetChannelId, AddUserToChat, ClearChat } from '../../../../shared/ngxs/actions/chat.action';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';
import { ToggleSideNav } from '../../../../shared/ngxs/actions/ui.action';


@Component({
  selector: 'app-select-list',
  templateUrl: './selectList.component.html',
  styleUrls: ['./selectList.component.scss']
})
export class SelectListComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.ChatState.currentWorkspace) current$: Observable<WorkspaceDetailsModel>;
    @Select(state => state.UIState.sideSelection) selectedList$: Observable<number>;

    open: boolean;
    hasChannels = false;
    channels: ChannelDetailsModel[];
    users: WorkspaceUserModel[];
    listNumber: number;
    show: boolean;
    showChannel = false;
    title: string;
    constructor(private store: Store) {
      this.sideOpen$.subscribe((result) => {
        this.open = result;
      });

      this.selectedList$.subscribe((listNumber) => {
          this.listNumber = listNumber;
          if (listNumber === 0) {
            this.show = false;
          } else {
            this.show = true;
            if (listNumber === 1) {
              this.showChannel = true;
              this.title = 'My Channels';
            } else {
              this.showChannel = false;
              this.title = 'Workspace Users';
            }

            this.current$.subscribe(result => {
              if (result != null) {
                if (listNumber === 1) {
                  if (result.Channels != null) {
                    if (result.Channels.length > 0) {
                      this.channels = result.Channels;
                    }
                  }
                } else {
                  if (result.Users != null) {
                    if (result.Users.length > 0) {
                      this.users = result.Users;
                    }
                  }
                }
              }
            });
          }
      });

    }


    selectChannel(channel: ChannelDetailsModel) {
      this.store.dispatch(new SetChannelId(channel.Id));
    }

    selectUser(user: WorkspaceUserModel) {
     const otherUserModel = new OtherUserModel();
     otherUserModel.setByWorkspaceUserModel(user);
     this.store.dispatch(new ClearChat());
     this.store.dispatch(new AddUserToChat(otherUserModel));
     this.store.dispatch(new ToggleSideNav());
    }
}