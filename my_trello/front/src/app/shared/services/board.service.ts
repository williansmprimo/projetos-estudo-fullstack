import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Board } from "../types/board.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { Column } from "../types/column.interface";
import { SocketIoService } from "./socket.io.service";
import { SocketEvents } from "../types/socket.events.enum";
import { Task } from "../types/task.interface";

@Injectable()
export class BoardService {
    baseURL = environment.baseURL;

    actualBoard$ = new BehaviorSubject<Board | null>(null);
    columns$ = new BehaviorSubject<Column[]>([]);
    tasks$ = new BehaviorSubject<Task[]>([]);

    constructor(private http: HttpClient, private soketService: SocketIoService){}

    addColumn(column: Column){
        this.columns$.next([...this.columns$.getValue(), column]);
    }

    createColumn(column: Column){
        this.soketService.emit(SocketEvents.createColumn, column);
    }

    setColumns(columns: Column[]){
        this.columns$.next(columns);
    }

    getTasks(boardId: string){
        return this.http.get<Task[]>(this.baseURL + "/boards/" + boardId + "/tasks");
    }

    addTask(task: Task){
        this.tasks$.next([...this.tasks$.getValue(), task]);
    }

    createTask(task: Task){
        this.soketService.emit(SocketEvents.createTask, task);
    }

    setTasks(tasks: Task[]){
        this.tasks$.next(tasks);
    }

    getColumns(boardId: string){
        return this.http.get<Column[]>(this.baseURL + "/boards/" + boardId + "/columns");
    }

    getBoards(){
        return this.http.get<Board[]>(this.baseURL + "/boards");
    }

    getBoard(id: string){
        return this.http.get<Board>(this.baseURL + `/boards/${id}`);
    }

    createBoard(board: Board){
        return this.http.post<Board>(this.baseURL + "/boards", board);
    }

    setActualBoard(board: Board | null){
        this.actualBoard$.next(board);
    }
}