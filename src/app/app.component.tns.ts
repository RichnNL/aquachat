import { Component, ViewChild, OnInit, AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DialogHelper } from './shared/helpers/dialog/dialog.helper';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetLoggedIn } from './shared/ngxs/actions/authentication.action';
import { AuthenticationState } from './shared/ngxs/state/authentication.state';
import { SetMyWorkSpaces } from './shared/ngxs/actions/chat.action';
import { AquachatAPIService } from './core/services/aquachatAPI.service';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(RadSideDrawerComponent) drawercomponent: RadSideDrawerComponent;
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;

    sideOpen = false;
    ngAfterViewInit(): void {
        this.changeDetection.detectChanges();
    }
    ngOnInit(): void {
        this.sideOpen$.subscribe((result) => {
            if (result !== this.sideOpen) {
                this.drawercomponent.sideDrawer.toggleDrawerState();
                this.sideOpen = result;
            }
        });
    }

    constructor(private webAPI: AquachatAPIService, private dialogHelper: DialogHelper,
         private store: Store, private changeDetection: ChangeDetectorRef) {
      
     }

    logOut() {
        this.store.dispatch(new SetLoggedIn(false));
    }
}
