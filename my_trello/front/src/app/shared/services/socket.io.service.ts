import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { io, Socket } from 'socket.io-client'
import { User } from "../../auth/types/user.interface";

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
}