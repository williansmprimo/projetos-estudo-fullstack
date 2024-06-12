import mongoose, { Schema } from "mongoose";
import { BoardDocument } from "../types/board.interface";

const schema = new Schema<BoardDocument>({
    title: {
        type: String,
        riquered: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        riquered: true
    }
});

export const BoardModel = mongoose.model<BoardDocument>('Board', schema);