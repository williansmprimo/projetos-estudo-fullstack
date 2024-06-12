import { Document } from "mongoose";

export interface Board {
    title: string;
    userId: String;
}

export interface BoardDocument extends Board, Document {}