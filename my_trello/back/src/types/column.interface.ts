import { Document, Schema } from "mongoose";

export interface Column {
    title: string;
    boardId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
}

export interface ColumnDocument extends Column, Document{}