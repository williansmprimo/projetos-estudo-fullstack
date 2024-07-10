import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { InlineFormModule } from "../../modules/inline-form.module";
import { BoardService } from "../../services/board.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { Board } from "../../types/board.interface";
import { CommonModule } from "@angular/common";
import { filter, Observable } from "rxjs";
import { SocketIoService } from "../../services/socket.io.service";
import { SocketEvents } from "../../types/socket.events.enum";

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
    boardId: string = '';

    constructor(
        private service: BoardService,
        private route: ActivatedRoute,
        private router: Router,
        private socketIoService: SocketIoService
    ){
        this.board$ = this.service.actualBoard$.pipe(filter(Boolean));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.boardId = params['id'];
            this.socketIoService.emit(SocketEvents.boardsJoin, { boardId: this.boardId });
            this.service.getBoard(this.boardId).subscribe((board) => {
                this.service.setActualBoard(board);
            })
        })
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart){
                console.log('Leaving the board!');
                this.socketIoService.emit(SocketEvents.boardsLeave, { boardId: this.boardId });
            }
        })
    }

    editTitle(title: string){
        console.log(title);
    }

    newCard(title: string){
        console.log(title);
    }
}
