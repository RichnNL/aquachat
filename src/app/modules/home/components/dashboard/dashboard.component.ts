import { Component, OnInit } from '@angular/core';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TokenModel } from '../../../../shared/models/token.model';
import { Workspace } from '../../../../core/models/WorkspaceModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(state => state.AuthenticationState.id) id$: Observable<string>;
  @Select(state => state.ChatState.myWorkspaces) workspaces$: Observable<Workspace[]>;
  @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
  channelList;
  userID: string;
  workspacename: string = '';
  selectedUsers: string[] = [];
 workspaces: Workspace[];
 open = false;
  constructor(private webAPIService: AquachatAPIService) {
    this.id$.subscribe((result) => {
      this.userID = result;
    });

    this.sideOpen$.subscribe((isOpen) => {
      this.open = isOpen;
    });

    this.workspaces$.subscribe((result) => {
      this.workspaces = result;
    });
   }



  ngOnInit() {}




  itemClicked(item) {
    // TODO
  }

}
