import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { io, Socket } from 'socket.io-client'
import { User } from "../../auth/types/user.interface";
import { Observable } from "rxjs";

@Injectable()
export class SocketIoService {

    baseURL = environment.socketIOURL;
    socket?: Socket;

    constructor(){}

    setupConnection(user: User){
        this.socket = io(this.baseURL, {
            auth: {
                token: user.token
            }
        })
    }

    disconnect(){
        this.socket?.disconnect();
    }

    emit(eventName: string, message: any){
        this.socket?.emit(eventName, message);
    }

    listem<T>(eventName: string){
        return new Observable<T>(subscriber => {
            this.socket?.on(eventName, (data) => {
                subscriber.next(data);
            });
        });
    }
}