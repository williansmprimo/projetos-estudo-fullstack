import { Component, OnInit } from "@angular/core";
import { BoardService } from "../shared/services/board.service";
import { Board } from "../shared/types/board.interface";
import { MessageService } from "primeng/api";
import { InlineFormModule } from "../shared/modules/inline-form.module";
import { CardModule } from "primeng/card";

@Component({
    selector: "boards",
    templateUrl: "./boards.component.html",
    styleUrl: "./boards.component.css",
    standalone: true,
    imports: [
        InlineFormModule,
        CardModule
    ]
})
export class BoardsComponent implements OnInit{
    boards: Board[] = [];
    constructor(private boardService: BoardService, private messages: MessageService){}

    ngOnInit(): void {
        console.log('Teste');
        this.boardService.getBoards().subscribe({
            next: (boards) => {
                this.boards = boards
            },
            error: (err) => {
                this.messages.add({
                    summary: err.error.error
                });
            }
        });
    }

    handleSubmit(title: string){
        this.boardService.createBoard({ title: title })
        .subscribe(board => {
            this.boards = [...this.boards, board];
        })
    }
}