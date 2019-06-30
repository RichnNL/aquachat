import { ChannelDetailsModel } from './ChannelDetailsModel';
import { WorkspaceUserModel } from './WorkspaceUserModel';

export class WorkspaceDetailsModel {
    public Id: string;
    public Name: string;

    public PictureLocation: string;

    public IsOwner: boolean;

    public  Users: WorkspaceUserModel[];

    public Channels: ChannelDetailsModel[] ;
    
}