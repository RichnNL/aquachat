import { Component} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.model';
import { AzureService } from '../../../../core/authentication/azure.service';
import { SetIconColor } from '../../../../shared/ngxs/actions/ui.action';
import { UIColorModel } from '../../../../core/models/UIColor.Model';
import { UserDisplayModel } from '../../../../core/models/UserDisplay.Model';



@Component({
  selector: 'app-profile',
  templateUrl: './profileIcon.component.html',
  styleUrls: ['./profileIcon.component.scss']
})
export class ProfileIconComponent {
    @Select(state => state.UIState.sideNavOpen) sideOpen$: Observable<boolean>;
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    open;
    jobTitle = '';
    name = '';
    location;
    bgColor;
    fgColor;
    displayName: string;
    initials: string;
    constructor(private store: Store, private azureService: AzureService) {
        this.store.dispatch(new SetIconColor()).subscribe((result) => {
            const index = result.UIState.iconColor;
            const colors = new UIColorModel();
            this.bgColor = colors.bgColor[index];
            this.fgColor = colors.fgColor[index];
            const display = new UserDisplayModel();
            display.setUserModel(result.AuthenticationState.user);
            this.displayName = display.displayName;
            this.initials = display.initials;
        });
        
        this.sideOpen$.subscribe((isOpen) => {
            this.open = isOpen;
        });

        this.user$.subscribe((result) => {
            if (result) {
                if (result.JobTitle) {
                    this.jobTitle = result.JobTitle;
                }
                if (result.DisplayName) {
                    this.name = result.DisplayName;
                } else if (result.Firstame) {
                    this.name = result.Firstame;
                } else if(result.LastName) {
                    this.name = result.LastName;
                }
            }
            this.location = '../../../../assets/media/placeholder.svg';
        });
    }

    editProfile() {
        this.azureService.editProfile();
    }
}