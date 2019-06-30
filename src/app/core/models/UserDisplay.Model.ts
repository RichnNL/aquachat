import { UserModel } from '../../shared/models/user.model';

export class UserDisplayModel {
    displayName: string;
    email: string;
    initials: string;

    setDisplayName(name: string) {
        if (name != null) {
            if (name.length > 0) {
                this.displayName = name;
            }
        } else {
            this.displayName = 'Unknown';
            this.initials = '?';
            return;
        }

        const initial = this.displayName.split(' ');
            if (initial.length === 1) {
                this.initials = initial[0].substring(0, 1);
            } else if (initial.length > 1) {
                this.initials = initial[0].substring(0, 1) + initial[1].substring(0, 1);
            }

    }

    setUserModel(user: UserModel) {
        let set = false;
        if (user.DisplayName != null) {
            if (user.DisplayName.length > 0) {
                this.displayName = user.DisplayName;
                set = true;
            }
        }

            if (!set && user.Firstame != null && user.LastName != null ) {
                if (user.Firstame.length > 0 && user.LastName.length > 0) {
                    this.displayName = user.Firstame + ' ' + user.LastName;
                    set = true;
                }
            }
            if (!set && user.Firstame != null) {
                if (user.Firstame.length > 0 ) {
                    this.displayName = user.Firstame;
                    set = true;
                }
            }

            if (!set && user.LastName != null) {
                if (user.LastName.length > 0 ) {
                    this.displayName = user.LastName;
                    set = true;
                }
            }

            if ( !set) {
                this.displayName = 'Unknown';
                this.initials = '?';
            } else {
                const initial = this.displayName.split(' ');
                if (initial.length === 1) {
                    this.initials = initial[0].substring(0, 1);
                } else if (initial.length > 1) {
                    this.initials = initial[0].substring(0, 1) + initial[1].substring(0, 1);
                }
            }

            if (user.Email != null) {
                this.email = user.Email;
            }
    }
}