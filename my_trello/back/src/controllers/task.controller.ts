import { NextFunction, Response } from "express";
import { ExpressRequest } from "../types/express-request.interface";
import { Server } from "socket.io";
import { UserSocker } from "../types/socket.interface";
import { Error } from "mongoose"
import { TaskModel } from "../models/task.model";
import { SocketEvents } from "../types/socket.events.enum";

export const getTasks = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    if(!req.user){
        return res.sendStatus(402);
    }
    console.log("getTasks: ", req.params.id);
    try{
        const tasks = await TaskModel.find({
            boardId: req.params.id
        });
        res.send(tasks);
    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(422).send(Object.values(error.errors).map((err) => err.message));
        }
        next(error);
    }
};

export const createTask = async (io: Server, socket: UserSocker, data: any) => {
    if(!socket.user){
        socket.emit(SocketEvents.createTaskFail, new Error("Authentication error!"));
        return ;
    }
    console.log("createTask: ", data);
    try{
        const newTask = new TaskModel({
            title: data.title,
            description: data.description,
            boardId: data.boardId,
            userId: socket.user?.id,
            columnId: data.columnId
        });
        const task = await newTask.save();
        // Emits to ever one that is registered to this boradId
        io.to(data.boardId).emit(SocketEvents.createTaskSucess, task);
    }catch(error){
        if(error instanceof Error.ValidationError){
            socket.emit(
                SocketEvents.createTaskFail,
                Object.values(error.errors).map((err) => err.message)
            );
            return ;
        }
        socket.emit(SocketEvents.createTaskFail,error);
    }
};