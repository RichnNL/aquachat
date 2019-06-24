import { MessageModel } from './MessageModel';

export class ChatModel {
    public SenderID: string;
    public SenderEmail: string;
    public WorkspaceId: string;
    public ChannelId: string;
    public ChatId: string;
    public Messages: MessageModel[];
    public Name: string;
}