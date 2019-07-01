import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationMapModel } from '../../../../shared/models/notificationMap.Model';
import { SetSideSelection, ToggleSideNav } from '../../../../shared/ngxs/actions/ui.action';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Select(state => state.ChatState.notificationMap) totalNotifications$: Observable<NotificationMapModel>;
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    workspaces: number;
    channels: number;
    direct: number;
    open: boolean;
    messagelocation = '../../../../../assets/media/youve_got_mail.png';
    workspaceImageLocation = '../../../../../assets/media/workspace.png';
    channelImageLocation = '../../../../../assets/media/channel.png';
    constructor(private store: Store) {
        this.totalNotifications$.subscribe(result => {
            this.channels = result.totalChannel;
            this.direct = result.totalDirect;
            this.workspaces = result.totalWorkspace;
        });

        this.sideOpen$.subscribe(result => {
            this.open = result;
        });

    }
    selectChannels(open: boolean) {
        if (!open) {
            this.store.dispatch(new ToggleSideNav());
        }


        this.store.dispatch(new SetSideSelection(1));
    }
    selectUsers(open: boolean) {
        if (!open) {
            this.store.dispatch(new ToggleSideNav());
        }
      
        this.store.dispatch(new SetSideSelection(2));
    }

    openNav() {
        this.store.dispatch(new ToggleSideNav());
    }

  

}