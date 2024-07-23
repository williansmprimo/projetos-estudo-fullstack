import { Socket } from "socket.io";
import { UserDocument } from "./user.interface";

export interface UserSocker extends Socket {
    user?: UserDocument;
}