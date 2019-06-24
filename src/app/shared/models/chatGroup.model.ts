export class ChatGroupModel {
    chatId: string;
    emails: string[];

    constructor(id?: string, emails?: string[]) {
        this.chatId = id;
        this.emails = emails;
    }
}
