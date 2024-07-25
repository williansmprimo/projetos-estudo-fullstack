import { Document, Schema } from "mongoose";

export interface Task {
    title: string;
    description: string;
    boardId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    columnId: Schema.Types.ObjectId;
}

export interface TaskDocument extends Task, Document{}