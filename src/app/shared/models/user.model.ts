export class UserModel {
    DisplayName?: string;
    Firstame?: string;
    LastName?: string;
    UserId: string;
    Email?: string;
    JobTitle?: string;

    constructor(userId?: string, first?: string, last?: string, display?: string
        , email?: string, job?: string) {
        this.UserId = userId;
        this.DisplayName = display;
        this.Firstame = first;
        this.LastName = last;
        this.Email = email;
        this.JobTitle = job;
    }
}