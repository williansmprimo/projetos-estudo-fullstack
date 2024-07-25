import mongoose, { Schema } from "mongoose";
import { TaskDocument } from "../types/task.interface";

const schema = new Schema<TaskDocument>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    columnId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const TaskModel = mongoose.model('Task', schema);