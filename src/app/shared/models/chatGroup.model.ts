export class ChatGroupModel {
    chatId: string;
    emails: string[];
    type: string;

    constructor(id?: string, emails?: string[], type?: string) {
        this.chatId = id;
        this.emails = emails;
        this.type = type;
    }
}
