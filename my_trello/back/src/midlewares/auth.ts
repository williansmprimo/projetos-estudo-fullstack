import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { secrete } from "../config"
import UserModel from "../models/user.model";
import { ExpressRequest } from "../types/express-request.interface";

export default async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        console.log('authMidleware!');
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.sendStatus(401);
        }

        const token = authHeader.split(" ")[1];
        const data = jwt.verify(token, secrete) as { id: string };
        const user = await UserModel.findById(data.id);

        if(!user){
            return res.sendStatus(401);
        }

        req.user = user;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};