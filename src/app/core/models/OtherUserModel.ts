import { WorkspaceUserModel } from "./WorkspaceUserModel";


export class OtherUserModel {
    public JobTitle: string;
    public DisplayName: string;
    public FirstName: string;
    public LastName: string;
    public Email: string[];
    public IsOwner: Boolean;
    public PictureLocation: string;

    setByWorkspaceUserModel(work: WorkspaceUserModel) {
        if (work.DisplayName != null) {
            if (work.DisplayName.length > 0) {
                this.DisplayName = work.DisplayName;
            }
        }

        if (work.JobTitle != null) {
            if (work.JobTitle.length > 0) {
                this.JobTitle  = work.JobTitle ;
            }
        }

        if (work.LastName != null) {
            if (work.LastName.length > 0) {
                this.LastName = work.LastName;
            }
        }


        if (work.FirstName != null) {
            if (work.FirstName.length > 0) {
                this.FirstName = work.FirstName;
            }
        }

        if (work.Email != null) {
            if (work.Email.length > 0) {
                this.Email = work.Email;
            }
        }

        if (work.IsOwner) {
            this.IsOwner = true;
        } else {
            this.IsOwner = false;
        }

    }
}