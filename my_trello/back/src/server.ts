import express from "express";
import { createServer } from "http"
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as userController from "./controllers/user.controller"
import * as boardController from "./controllers/board.controller"
import * as columnController from "./controllers/column.controller"
import * as taskController from "./controllers/task.controller"
import authMidelWare from "./midlewares/auth"
import cors from "cors"
import { SocketEvents } from "./types/socket.events.enum";
import jwt from "jsonwebtoken"
import { secrete } from "./config";
import UserModel from "./models/user.model";
import { UserSocker } from "./types/socket.interface";

//Setup
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

//METHODS
app.get("/health", (req, res) => {
    res.send({
        status: "OK"
    });
});

// curl -X POST localhost:3001/api/users -d '{"name":"willians", "email":"email@email.com","username":"username","password":"pass"}' -H 'Content-Type:application/json'
app.post("/api/users", userController.register);

// curl -X POST localhost:3001/api/users/login -d '{"username":"username","password":"pass"}' -H 'Content-Type:application/json'
app.post("/api/users/login", userController.login);

// curl -X GET localhost:3001/api/users
// app.use("/api/users", authMidelWare);
// app.get("/api/users", userController.currentUser);
app.get("/api/users", authMidelWare, userController.currentUser);

app.get("/api/users/list", userController.list);

app.get("/api/boards", authMidelWare, boardController.getBoards);
app.get("/api/boards/:id", authMidelWare, boardController.getBoard);
app.get("/api/boards/:id/columns", authMidelWare, columnController.getColumns);
app.get("/api/boards/:id/tasks", authMidelWare, taskController.getTasks);
app.post("/api/boards", authMidelWare, boardController.createBoard);

//socket.io
io.use(async (socket: UserSocker, next) =>{
    try{
        const token = socket.handshake.auth.token as string ?? "";
        const data = jwt.verify(token, secrete) as { id: string };
        const user = await UserModel.findById(data.id);
        if(!user){
            return next(new Error("Authentication error!"));
        }
        socket.user = user;
        next();
    } catch (error) {
        return next(new Error("Authentication error!"));
    }
}).on("connection", (socket: UserSocker) => {
    socket.on(SocketEvents.boardsJoin, (data) => {
        console.log("userID:", socket.user?.id);
        boardController.joinBoard(io, socket, data);
    });

    socket.on(SocketEvents.boardsLeave, (data) => {
        console.log("userID:", socket.user?.id);
        boardController.leaveBoard(io, socket, data);
    });

    socket.on(SocketEvents.createColumn, (data) => {
        console.log("userID:", socket.user?.id);
        columnController.createColumn(io, socket, data);
    });

    socket.on(SocketEvents.createTask, (data) => {
        console.log("userID:", socket.user?.id);
        taskController.createTask(io, socket, data);
    });
});

// docker rm -v -f $(docker ps -qa)
// docker exec -it mongodb
// Start mongo: docker run --rm -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4
mongoose.connect("mongodb://localhost:27017/trello").then(() => {
    console.log("conected to mongodb!")

    // Start server
    httpServer.listen(3001, () => {
        console.log("Server is UP!");
    });
});