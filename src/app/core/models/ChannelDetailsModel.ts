import { ChannelUserModel } from './ChannelUserModel';

export class ChannelDetailsModel {
        public Id: string;
        public Name: string;
        public  PictureLocation: string;
        public Users: ChannelUserModel[];
}