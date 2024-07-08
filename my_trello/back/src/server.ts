import express from "express";
import { createServer } from "http"
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as userController from "./controllers/user.controller"
import * as boardController from "./controllers/board.controller"
import authMidelWare from "./midlewares/auth"
import cors from "cors"

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
app.post("/api/boards", authMidelWare, boardController.createBoard);

//socket.io
io.on("connection", () => {
    console.log("connected to socket.io");
});

// docker rm -v -f $(docker ps -qa)
// Start mongo: docker run --rm -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4
mongoose.connect("mongodb://localhost:27017/trello").then(() => {
    console.log("conected to mongodb!")

    // Start server
    httpServer.listen(3001, () => {
        console.log("Server is UP!");
    });
});