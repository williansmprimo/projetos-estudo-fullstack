import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Board } from "../types/board.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { Column } from "../types/column.interface";
import { SocketIoService } from "./socket.io.service";
import { SocketEvents } from "../types/socket.events.enum";

@Injectable()
export class BoardService {
    baseURL = environment.baseURL;

    actualBoard$ = new BehaviorSubject<Board | null>(null);
    columns$ = new BehaviorSubject<Column[]>([]);

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