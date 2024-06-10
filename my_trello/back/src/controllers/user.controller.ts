import { NextFunction, Request, Response } from "express";
import UserModel from "../models/UserModel";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose"
import { ExpressRequest } from "../types/express-request";
import jwt from "jsonwebtoken"
import { secrete } from "../config";

const normalizeUser = (user: UserDocument) => {
    console.log('normalizeUser!');
    const jwtToken = jwt.sign({
        id: user.id,
        email: user.email
    }, secrete);

    return {
        name: user.name,
        email: user.email,
        username: user.username,
        token: jwtToken
    };
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    console.log('register!');
    try {
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        const user = await newUser.save();
        res.send(normalizeUser(user));
    } catch (error) {
        if(error instanceof Error.ValidationError){
            res.status(422).send(Object.values(error.errors).map((err) => err.message));
        }
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log('login!');
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username: username }).select('+password');
        if(!user){
            return res.status(422).json({ error: 'Ivalid user or password!' });
        }

        const isSamePassword = await user.validatePassword(password);
        if(!isSamePassword){
            return res.status(422).json({ error: 'Ivalid user or password!' });
        }
        
        res.send(normalizeUser(user));
    } catch (error) {
        if(error instanceof Error.ValidationError){
            res.status(422).send(Object.values(error.errors).map((err) => err.message));
        }
        next(error);
    }
};

export const currentUser = (req: ExpressRequest, res: Response) => {
    console.log('currentUser!');
    if(!req.user){
        return res.sendStatus(401);
    }
    res.send(normalizeUser(req.user));
};

// Only for testing
export const list = async (req: Request, res: Response, next: NextFunction) => {
    console.log('list!');
    try {
        const users = await UserModel.find();
        res.send(users.map(user => normalizeUser(user)));
    } catch (error) {
        next(error);
    }
};