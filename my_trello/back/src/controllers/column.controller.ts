import { NextFunction, Response } from "express";
import { ExpressRequest } from "../types/express-request.interface";
import { Server } from "socket.io";
import { UserSocker } from "../types/socket.interface";
import { Error } from "mongoose"
import { ColumnModel } from "../models/column.model";
import { SocketEvents } from "../types/socket.events.enum";
import { ColumnDocument } from "../types/column.interface";

export const getColumns = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    if(!req.user){
        return res.sendStatus(402);
    }
    console.log("getColumns: ", req.params.id);
    try{
        const columns = await ColumnModel.find({
            boardId: req.params.id
        });
        res.send(columns);
    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(422).send(Object.values(error.errors).map((err) => err.message));
        }
        next(error);
    }
};

export const createColumn = async (io: Server, socket: UserSocker, data: any) => {
    if(!socket.user){
        socket.emit(SocketEvents.createColumnFail, new Error("Authentication error!"));
        return ;
    }
    console.log("createColumn: ", data);
    try{
        const newColumn = new ColumnModel({
            title: data.title,
            boardId: data.boardId,
            userId: socket.user?.id
        });
        const column = await newColumn.save();
        // Emits to ever one that is registered to this boradId
        io.to(data.boardId).emit(SocketEvents.createColumnSucess, column);
    }catch(error){
        if(error instanceof Error.ValidationError){
            socket.emit(
                SocketEvents.createColumnFail,
                Object.values(error.errors).map((err) => err.message)
            );
            return ;
        }
        socket.emit(SocketEvents.createColumnFail,error);
    }
};

export const updateColumn = async (io: Server, socket: UserSocker, data: { boardId: string, _id: string, title: string }) => {
    console.log('updateColumn columnId: ', data._id);
    if(!socket.user){
        socket.emit(SocketEvents.updateColumnFail, new Error("Authentication error!"));
        return ;
    }
    try{
        const  updatedColumn = await ColumnModel.findByIdAndUpdate(data._id, { title: data.title }, { new: true });
        io.to(data.boardId).emit(SocketEvents.updateColumnSucess, updatedColumn);
    }catch(error){
        if(error instanceof Error.ValidationError){
            socket.emit(
                SocketEvents.updateColumnFail,
                Object.values(error.errors).map((err) => err.message)
            );
            return ;
        }
        socket.emit(SocketEvents.updateColumnFail,error);
    }
};