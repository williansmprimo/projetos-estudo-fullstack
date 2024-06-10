import { Document } from "mongoose";

export interface User{
    name: string;
    email: string;
    username: string;
    password: string;
    createAt: Date;
};

export interface UserDocument extends User, Document {
    validatePassword(password: string): Promise<boolean>;
};