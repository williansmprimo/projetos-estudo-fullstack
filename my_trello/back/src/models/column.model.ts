import mongoose, { Schema } from "mongoose";
import { ColumnDocument } from "../types/column.interface";

const schema = new Schema<ColumnDocument>({
    title: {
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
    }
});

export const ColumnModel = mongoose.model('Column', schema);