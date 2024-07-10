import { NextFunction, Response } from "express";
import { Error } from "mongoose"
import { ExpressRequest } from "../types/express-request.interface";
import { BoardDocument } from "../types/board.interface";
import { BoardModel } from "../models/board.model";
import { Server, Socket } from "socket.io";

const normalizeBoard = (board: BoardDocument) => {
    return {
        id: board.id,
        title: board.title,
        userId: board.userId
    };
};

export const createBoard = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    console.log('createBoard!');
    if(!req.user){
        return res.sendStatus(401);
    }
    try {
        const newBoard = new BoardModel({
            title: req.body.title,
            userId: req.user.id
        });
        const board = await newBoard.save();
        res.send(normalizeBoard(board));
    } catch (error) {
        if(error instanceof Error.ValidationError){
            res.status(422).send(Object.values(error.errors).map((err) => err.message));
        }
        next(error);
    }
};

export const getBoards = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    console.log('getBoards!');
    if(!req.user){
        return res.sendStatus(401);
    }
    try {
        const boards = await BoardModel.find({
            userId: req.user.id
        });
        res.send(boards.map(board => normalizeBoard(board)));
    } catch (error) {
        next(error);
    }
};

export const getBoard = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    console.log('getBoard!id: ', req.params.id);
    if(!req.user){
        return res.sendStatus(401);
    }
    try {
        const board = await BoardModel.findOne({
            _id: req.params.id
        });
        if(board){
            res.send(normalizeBoard(board));
        }else{
            res.sendStatus(400);
        }
    } catch (error) {
        next(error);
    }
};

export const joinBoard = (io: Server, socket: Socket, data: { boardId: string }) => {
    console.log('Joined boarID: ', data.boardId);
    socket.join(data.boardId);
};

export const leaveBoard = (io: Server, socket: Socket, data: { boardId: string }) => {
    console.log('Leave boarID: ', data.boardId);
    socket.join(data.boardId);
};