import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { InlineFormModule } from "../../modules/inline-form.module";
import { BoardService } from "../../services/board.service";
import { ActivatedRoute } from "@angular/router";
import { Board } from "../../types/board.interface";
import { CommonModule } from "@angular/common";
import { filter, Observable } from "rxjs";

@Component({
    selector: "board",
    templateUrl: "board.component.html",
    standalone: true,
    imports: [
        InlineFormModule,
        CardModule,
        CommonModule
    ]
})
export class BoardComponent implements OnInit{
    board$: Observable<Board>;

    constructor(
        private service: BoardService,
        private route: ActivatedRoute
    ){
        this.board$ = this.service.actualBoard$.pipe(filter(Boolean));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const boardId = params['id'];
            this.service.getBoard(boardId).subscribe((board) => {
                this.service.setActualBoard(board);
            })
        })
    }

    editTitle(title: string){
        console.log(title);
    }

    newCard(title: string){
        console.log(title);
    }
}
