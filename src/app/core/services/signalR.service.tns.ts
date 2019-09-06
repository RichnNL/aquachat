import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { MessageModel } from '../models/MessageModel';
import { AquachatAPIService } from './aquachatAPI.service';
import {HubConnectionName} from '../../config/signalR.config';


@Injectable()
export class SignalRService {
    connection: any;
    userId: string;
    emails: string[];

    isConnected = false;
    @Select(state => state.AuthenticationState.user) user$: Observable<UserModel>;
    constructor(private webAPI: AquachatAPIService,
        ) {
        this.user$.subscribe(user => {
            if (user && user.UserId.length > 0 && user.UserId !== 'undefined') {
              this.userId = user.UserId;
              this.emails = [user.Email];
            }
          });
        //   this.connection  =  new SignalrCore();
        //   this.connection.start('https://aquachatapi.azurewebsites.net/chat').then(() => {
        //   console.log('Connected To Signal R');
        //   this.zone.run(() => {
        //     this.cd.detectChanges();
        //     this.connectionComplete();
    //     //     this.isConnected = true;
    // });
    //       }).catch(error => {
    //           console.log(error);
    //       });
    }


    private connectionComplete() {
        if (this.connection) {
            const userId = this.userId;
            const emails = this.emails;
            const show = [true];
            this.connection.invoke('registerClientOnline', userId, emails, show  ).then((result) => {
                this.isConnected = true;
                this.setListeners();
            }).catch(error => console.log(error));
        }
    }

    public sendMessage(message: MessageModel) {
        if (this.isConnected) {
            this.connection.invoke('sendMessage', message ).catch(error => {
                console.log(error);
                this.webAPI.sendMessage(message);
            });
        } else {
            this.webAPI.sendMessage(message);
        }
    }

    private setListeners() {
       this.connection.on('ON_USER_STATUS', (data) => {
            console.log(data);
        });

        this.connection.on('ON_MESSAGE_RECEIVED', (data) => {
            const message: MessageModel = data;
            console.log('message');
        });
    }


    private enterChat(userId: string, chatId: string) {
        if (this.connection) {
            this.connection.invoke('enterChat', userId, chatId ).catch(error => console.log('Enter Catch ' + error));
        }
    }

    public setIsTyping(userId: string, userEmail: string, chatId: string)
    {
        if (this.connection) {
            this.connection.invoke('isTyping', userId, userEmail , chatId  );
        }
    }

    public listenOnline(userId: string, emails: string[]) {
        if (this.connection) {
            this.connection.invoke('listenOnline', userId, emails ).catch(error => console.log(error));
        }
    }

    public stoplistenOnline(userId: string, emails: string[]) {
        if (this.connection) {
            this.connection.invoke('stopListenOnline', userId, emails ).catch((error) => console.log(error));
        }
    }

    public setOnlineStatus(userId: string, email: string, isOnline: boolean) {
            if (this.connection) {
                this.connection.invoke('setOnlineStatus', userId, email, isOnline ).catch(error => console.log(error));
            }
        }
}