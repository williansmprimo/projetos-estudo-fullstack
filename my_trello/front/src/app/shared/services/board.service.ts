import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Board } from "../types/board.interface";

@Injectable()
export class BoardService {
    baseURL = environment.baseURL;

    constructor(private http: HttpClient){}

    getBoards(){
        return this.http.get<Board[]>(this.baseURL + "/boards");
    }

    createBoard(board: Board){
        return this.http.post<Board>(this.baseURL + "/boards", board);
    }
}