import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { io, Socket } from 'socket.io-client'
import { User } from "../../auth/types/user.interface";

@Injectable()
export class SocketIoService {

    baseURL = environment.baseURL;
    socket?: Socket;

    constructor(private http: HttpClient){}

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
}