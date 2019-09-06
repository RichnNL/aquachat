import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';
import { UserDisplayModel } from '../../../../core/models/UserDisplay.Model';
@Component({
  selector: 'app-chat-tool',
  templateUrl: './chat-tool.component.html',
  styleUrls: ['./chat-tool.component.scss']
})
export class ChatToolComponent {
  @Select(state => state.ChatState.selectedUsers) chatUsers$: Observable<OtherUserModel[]>;
  @Select(state => state.ChatState.currentWorkspace) currentWorkspaces$: Observable<WorkspaceDetailsModel>;
  addUser = '../../../../../assets/media/add_user.svg';
  attach = '../../../../../assets/media/attach.svg';
  addUserMobile = 'res://add_user';
  attachMobile = 'res://attach';
  title: string;
  initials: string;
  constructor() {
    const display = new UserDisplayModel();
   
    this.chatUsers$.subscribe(result => {
      if (result != null) {
        if (result.length > 0) {
          this.title = '';
          result.forEach(user => {
            this.title = this.title + user.DisplayName + ' ';
          });
          display.setDisplayName(this.title);
            this.initials = display.initials;
        }
      }
    });

    this.currentWorkspaces$.subscribe(result => {
      if (result != null) {
        this.title = result.Name;
        display.setDisplayName(this.title);
        this.initials = display.initials;
      }
    });
   }

   clicked($event) {

   }

  ngOnInit() {
  }

}
