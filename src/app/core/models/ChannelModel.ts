import { ChannelUserModel } from './ChannelUserModel';


export class ChannelModel {
    Id: string;
    Name: string;
    PictureLocation: string;
    Users: ChannelUserModel[];
}