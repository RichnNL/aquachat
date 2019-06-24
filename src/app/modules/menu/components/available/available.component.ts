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
    constructor(private store: Store) {
        this.sideOpen$.subscribe((isOpen) => {
            this.open = isOpen;
        });
        this.available$.subscribe((status) => {
            if (status === 1) {
                this.location = '../../../../assets/media/greenbutton.png';
                    this.available = 'Available';
            } else if (status === 2) {
                this.location = '../../../../assets/media/redbutton.png';
                this.available = 'Unavailable';
            }
        });
    }

    changeAvailable() {
        this.store.dispatch(new ClickedAvailable());
    }
}