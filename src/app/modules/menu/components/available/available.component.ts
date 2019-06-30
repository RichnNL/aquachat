import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';
import { ClickedAvailable } from '../../../../shared/ngxs/actions/chat.action';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.scss']
})
export class AvailableComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.ChatState.available) available$: Observable<number>;
    open;
    available = 'Available';
    location;
    mobileLocation = 'res://greenbutton';
    hover = false;
    constructor(private store: Store) {
        this.sideOpen$.subscribe((isOpen) => {
            this.open = isOpen;
        });
        this.available$.subscribe((status) => {
            if (status === 1 || status === -1) {
                this.location = '../../../../assets/media/greenbutton.png';
                    this.available = 'Available';
                    this.mobileLocation = 'res://greenbutton';
                    if (status === 1 ) {
                        // Signal R Notify
                    }
            } else if (status === 2 || status === -2) {
                this.location = '../../../../assets/media/redbutton.png';
                this.mobileLocation = 'res://redbutton';
                this.available = 'Unavailable';
                if (status === 2) {
                    // Signal R Notify
                }
            }
        });
    }

    changeAvailable() {
        this.store.dispatch(new ClickedAvailable());
    }

    mouseEnter() {
        this.hover = true;
    }
    mouseExit() {
        this.hover = false;
    }
}