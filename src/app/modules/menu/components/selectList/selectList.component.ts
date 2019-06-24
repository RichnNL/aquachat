import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';


@Component({
  selector: 'app-select-list',
  templateUrl: './selectList.component.html',
  styleUrls: ['./selectList.component.scss']
})
export class SelectListComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    constructor(private store: Store) {
    }
}