import { Component, OnInit, OnDestroy } from '@angular/core';
import { AquachatAPIService } from '../../../../core/services/aquachatAPI.service';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { WorkspaceDetailsModel } from '../../../../core/models/WorkspaceDetailsModel';

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
  constructor(private webAPIService: AquachatAPIService) {
    this.sideOpen$.subscribe((isOpen) => {
      this.open = isOpen;
    });

   this.workspaceSubscription = this.currentWorkspaces$.subscribe((result) => {
    if (result != null) {
      if (result.Name.length > 0) {
        this.workspacename = result.Name;
      }

      this.noWorkspaces = false;

    }  else {
      this.noWorkspaces = true;
      this.workspacename = 'Select a Workspace';
    }
    });
   }

   showJoin() { }

   showCreate() { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.workspaceSubscription.unsubscribe();
  }
}
