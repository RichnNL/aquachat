import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';
import { OtherUserModel } from '../../../../core/models/OtherUserModel';

@Component({
  selector: 'app-chat-tool',
  templateUrl: './chat-tool.component.html',
  styleUrls: ['./chat-tool.component.scss']
})
export class ChatToolComponent {
  @Select(state => state.ChatState.selectedUsers) chatUsers$: Observable<OtherUserModel[]>;
  @Select(state => state.ChatState.currentWorkspace) currentWorkspaces$: Observable<WorkspaceDetailsModel>;
  addUser = '../../../../../assets/media/add_user.svg';
  notification = '../../../../../assets/media/tempNotification.png';
  attach = '../../../../../assets/media/attach.svg';
  title: string;
  constructor() {
    this.chatUsers$.subscribe(result => {
      if(result != null) {
        if (result.length > 0) {
          this.title = result[0].DisplayName;
        }
      }
    });
   }

  ngOnInit() {
  }

}
