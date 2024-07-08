import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Board } from "../types/board.interface";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BoardService {
    baseURL = environment.baseURL;

    actualBoard$ = new BehaviorSubject<Board | null>(null);

    constructor(private http: HttpClient){}

    getBoards(){
        return this.http.get<Board[]>(this.baseURL + "/boards");
    }

    getBoard(id: string){
        return this.http.get<Board>(this.baseURL + `/boards/${id}`);
    }

    createBoard(board: Board){
        return this.http.post<Board>(this.baseURL + "/boards", board);
    }

    setActualBoard(board: Board){
        this.actualBoard$.next(board);
    }
}