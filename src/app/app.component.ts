import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from './shared/models/user.model';
import { DialogHelper } from './shared/helpers/dialog/dialog.helper';
import { AquachatAPIService } from './core/services/aquachatAPI.service';
import { SetMyWorkSpaces } from './shared/ngxs/actions/chat.action';
import { AuthenticationState } from './shared/ngxs/state/authentication.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(state => state.AuthenticationState.loggedIn) loggedIn$: Observable<boolean>;
  @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
  constructor(private dialogHelper: DialogHelper, private store: Store, private webAPI: AquachatAPIService) {
    this.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const userId = this.store.selectSnapshot(AuthenticationState).user.UserId;
        const userEmail = this.store.selectSnapshot(AuthenticationState).user.Email;
        this.webAPI.getUserDetails(userId, userEmail).subscribe((result) => {
            this.store.dispatch(new SetMyWorkSpaces(result));
        });
      } else {
        this.store.dispatch(new SetMyWorkSpaces([]));
      }
    });
  }
}
