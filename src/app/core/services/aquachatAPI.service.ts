import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTPUrls } from '../../config/urls.config';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ChannelModel } from '../models/ChannelModel';
import { RegisterUserDetails } from '../models/RegisterUserDetailsModel';
import { Workspace } from '../models/WorkspaceModel';
import { ResponseModel } from '../models/ResponseModel';
import { WorkspaceDetailsModel } from '../models/WorkspaceDetailsModel';
import { WorkspaceUserModel } from '../models/WorkspaceUserModel';
import { MessageModel } from '../models/MessageModel';
import { ChatModel } from '../models/ChatModel';


@Injectable()
export class AquachatAPIService {

    constructor(private http: HttpClient)  {
    }

    sendMessage(message: MessageModel): Observable<ResponseModel> {
       return this.http.post(HTTPUrls.postSendMessage, JSON.stringify(message) ).pipe(
            map((res: any) => {
                return this.responseToResponseModel(res);
              }));
    }

   registerUser(user: RegisterUserDetails): Observable<ResponseModel> {
    try {
      return  this.http.post(HTTPUrls.postAddNewUser , JSON.stringify(user)).pipe(
          map((res: any) => {
              return this.responseToResponseModel(res);
            }));
    } catch (error) {
         return new Observable<ResponseModel>(observer => {
            const res = new ResponseModel();
            res.ErrorMessage.push(error);
             observer.next(res);
         });
     }
   }

   addChannelToWorkspace(userId: string , workspace_id: string, channel: ChannelModel): Observable<ResponseModel> {
       if (channel.Name && workspace_id) {
            try {
                let hasCreator = false;
                if (channel.Users) {
                    channel.Users.forEach((user) => {
                        if (user.IsOwner) {
                            hasCreator = true;
                        }
                    });
                }
                if (hasCreator) {
                    return this.http.post(HTTPUrls.postAddChannel, JSON.stringify(channel), {
                        params: {
                          userid: userId,
                          workspaceid: workspace_id
                        }} ).pipe(
                            map((result: any) => {
                               return this.responseToResponseModel(result);
                            })
                        );
                }
                return null;
            } catch {
                return null;
            }
       } else {

       }
   }

   addWorkspace(userId: string , name: string, authorizedEmails: string[], email?: string): Observable<string> {
    const workspace = new Workspace();

    if (name && userId) {
        workspace.Creator = userId;
        workspace.Name = name;
        let emails = [email];
        if (authorizedEmails) {
           emails = emails.concat(authorizedEmails);
        }
        workspace.Owners = emails;

        try {
          return  this.http.post(HTTPUrls.postAddWorkspace, JSON.stringify(workspace)).pipe(
               map((result: any) => {
                  return this.reponseMessage(result);
               })
           );
        } catch (error) {
            return new Observable<string>(observer => {
                observer.next('Error');
                });
            }
    } else {
            return new Observable<string>(observer => {
            observer.next('Error');
            });
        }
    }

   addUserToWorkspace(userId: string ,workspace_id: string, usersToAdd: string[]): Observable<string> {
     try {
          return  this.http.post(HTTPUrls.postAddWorkspace, JSON.stringify(usersToAdd), {
            params: {
              userid: userId,
              workspaceid: workspace_id
            }} ).pipe(
               map((result: any) => {
                  return this.reponseMessage(result);
               })
           );
        } catch (error) {
            return new Observable<string>(observer => {
                observer.next('Error');
                });
            }
    }

    getUserDetails(userid: string, email: string): Observable<WorkspaceDetailsModel[]> {
        return this.http.get(HTTPUrls.getGetOwnDetails, {
            params: {
              userid: userid
            }} ).pipe(map((result) => {
                return this.responseToWorkspaceDetails(result, email);
            })
        );
    }

    addSelfToWorkspace(userId: string, email: string, workspace: string): Observable<ResponseModel> {
        const users = [email];
        return this.http.post(HTTPUrls.postAddUserToWorkspace, JSON.stringify(users), {
                    params: {
                      userid: userId,
                      workspaceid: workspace
                    }} ).pipe(
                       map((result: any) => {
                          return this.responseToResponseModel(result);
                       })
                   );
    }

    getAllWorkspace(userid: string, search: string): Observable<Workspace[]> {
        return this.http.get(HTTPUrls.getAllWorkspace, {
            params: {
              userid: userid,
              search: search
            }} ).pipe(
               map((result: any) => {
                 return this.responseToWorkspace(result);
               })
           );
    }
    removeUserFromWorkspace(userId: string, workspace_id: string, usersToRemove: string[]): Observable<string> {
         try {
              return  this.http.delete(HTTPUrls.deleteRemoveUserFromWorkspace, {
                params: {
                  userid: userId,
                  workspaceid: workspace_id,
                  users: usersToRemove
                }} ).pipe(
                   map((result: any) => {
                      return this.reponseMessage(result);
                   })
               );
            } catch (error) {
                return new Observable<string>(observer => {
                    observer.next('Error');
                    });
                }
        }

    getMessages(userId: string, emails: string[]): Observable<MessageModel[]> {
            return this.http.get(HTTPUrls.getDirectMesssageEmail, { params: {
                userid: userId,
                emails: emails
              }}).pipe(map( res => {
                  console.log(res);
                  if (!res) {
                    return null;
                  }
                  return this.responseToMessageModelArray(res);
              }));
    }

    getChannelMessages(userId: string, channelId: string, workspaceId: string): Observable<MessageModel[]> {
        return this.http.get(HTTPUrls.getChannelMessages, { params: {
            userid: userId,
            channel_Id: channelId,
            workspace_id: workspaceId
          }}).pipe(map( res => {
              if (!res) {
                return null;
              }
              return this.responseToMessageModelArray(res);
          }));
}

getWorkspaceMessages(userId: string, workspaceId: string): Observable<MessageModel[]> {
    return this.http.get(HTTPUrls.getChannelMessages, { params: {
        userid: userId,
        workspace_id: workspaceId
      }}).pipe(map( res => {
          if (!res) {
            return null;
          }
          return this.responseToMessageModelArray(res);
      }));
}

    getChatIdFromEmails(userId: string, emails: string[]): Observable<ResponseModel> {
        return this.http.get(HTTPUrls.getChatidEmails, { params: {
            userid: userId,
            emails: emails
          }}).pipe((map( r => {
            if (r) {
               return this.responseToResponseModel(r);
            }
        }
          )));
    }

    setNewChat(chatName: string, email: string, userId: string, selectedEmails: string[]): Observable<ResponseModel> {
        const chatmodel = new ChatModel();
        chatmodel.SenderEmail = email;
        chatmodel.SenderID = userId;
        chatmodel.Name = chatName;
        return this.http.post(HTTPUrls.postNewChat, JSON.stringify(chatmodel),
                            { params: {
                                emails: selectedEmails
                              }}
                            ).pipe(map( r => {
                                    if (r) {
                                       return this.responseToResponseModel(r);
                                    } else {
                                       return null;
                                    }
                            }));
    }


    private responseToResponseModel(object: any): ResponseModel {
        const s = new ResponseModel();
        if (object.errorMessage) {
            s.ErrorMessage = object.errorMessage;
        }
        if (object.message) {
            s.Message = object.message;
        }
        return s;
    }

    getDirectMessage(userid: string, chatid: string): Observable<MessageModel[]>{
      return  this.http.get(HTTPUrls.getDirectMessages,  {
            params: {
              userid: userid,
              chatid: chatid
            }} ).pipe(map(res => {
                return this.responseToMessageModelArray(res);
            }));
    }

    private responseToMessageModelArray(object: any): MessageModel[] {
        const message: MessageModel[] = [];
        if (object !== null) {
            object.forEach(element => {
                const temp = this.responseToMessageModel(element);
                message.push(temp);
            });
​          }
        return message;
    }

    private responseToChatModel(object: any): ChatModel {
        const chat = new ChatModel();

        return chat;
    }

    private responseToMessageModel(object: any): MessageModel {
        const temp = new MessageModel();
                if (object.chatId) {
                    temp.ChatId = object.chatId;
                }
                if (object.epoch) {
                    temp.Epoch = object.epoch;
                }
                if (object.payload) {
                    temp.Payload = object.payload;
                }
                if (object.senderEmail) {
                    temp.SenderEmail = object.senderEmail;
                }
                if (object.type) {
                    temp.Type = object.type;
                }
                if (object.workspaceId) {
                    temp.WorkspaceId = object.workspaceId;
                }
                if (object.channelId) {
                    temp.ChannelId = object.channelId;
                }
                return temp;
    }

    private responseToWorkspaceDetails(response: any, email: string) {
        const workarray: WorkspaceDetailsModel[] = [];
                if (response.workspaces) {
                    response.workspaces.forEach(element => {
                        const work = new WorkspaceDetailsModel();
                        work.Users = [];
                        if (element.id) {
                            work.Id = element.id;
                        }
                        if (element.name) {
                            work.Name = element.name;
                        }
                        if (element.picturelocation) {
                            work.Name = element.name;
                        }
                        if (element.isowner) {
                            work.IsOwner = true;
                        } else {
                            work.IsOwner = false;
                        }
                        if (element.users) {
                            element.users.forEach((user: any) => {
                                const otherUser = new WorkspaceUserModel();
                                if (user.email) {
                                        if (!user.email.includes(email)) {
                                            otherUser.Email = user.email;
                                            if (user.firstName) {
                                                otherUser.FirstName = user.firstName;
                                            }
                                            if (user.displayName) {
                                                otherUser.DisplayName = user.displayName;
                                            }
                                            if (user.isOwner) {
                                                otherUser.IsOwner = true;
                                            } else {
                                                otherUser.IsOwner = false;
                                            }
                                            if (user.jobTitle) {
                                                otherUser.JobTitle = user.jobTitle;
                                            }
                                            if (user.lastName) {
                                                otherUser.LastName = user.LastName;
                                            }
                                            work.Users.push(otherUser);
                                }
                            }
                            });
                        }
                        if (element.channels) {
                            element.channels.forEach(channel => {
                            });
                        }
                      workarray.push(work);
                    });
                }
                    return workarray;
    }

    private responseToWorkspace(response: any){
        const workspace: Workspace[] = [];
        response.forEach(element => {
          const temp = new Workspace();
          if (element.id) {
              temp.Id = element.id;
          }
          if (element.name) {
              temp.Name = element.name;
          }
          if (element.pictureLocation) {
              temp.PictureLocation = element.pictureLocation;
          }
          workspace.push(temp);

        });
        return workspace;
    }

    private reponseMessage(message: any): string {
        let r: string;
        if (message.errorMessage) {
          r = message.errorMessage;
        } else {
          r = message.message;
        }
        return r;
    }

    getWorkspaceNameTaken(workspaceName: string): Observable<boolean> {
        return this.http.get(HTTPUrls.getWorkspaceNameTaken,
                            { params: {
                                name: workspaceName
                              }}
                            ).pipe(
                                map( r => {
                                    if (r) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                            }));
    }




}
