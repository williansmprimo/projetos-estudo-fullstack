import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { InlineFormModule } from "../../modules/inline-form.module";
import { BoardService } from "../../services/board.service";
import { ActivatedRoute, NavigationStart, Router, RouterModule } from "@angular/router";
import { Board } from "../../types/board.interface";
import { CommonModule } from "@angular/common";
import { combineLatest, filter, map, Observable, Subscription } from "rxjs";
import { SocketIoService } from "../../services/socket.io.service";
import { SocketEvents } from "../../types/socket.events.enum";
import { Column } from "../../types/column.interface";
import { TopBarComponent } from "../top-bar/top-bar.componet";
import { Task } from "../../types/task.interface";
import { Button } from "primeng/button";

@Component({
    selector: "board",
    templateUrl: "board.component.html",
    styleUrl: "board.component.css",
    standalone: true,
    imports: [
        InlineFormModule,
        TopBarComponent,
        CardModule,
        CommonModule,
        Button,
        RouterModule
    ]
})
export class BoardComponent implements OnInit{
    data$: Observable<{board: Board, columns: Column[], tasks: Task[]}>;
    boardId: string = "";
    subscritions: Subscription[] = [];

    constructor(
        private service: BoardService,
        private route: ActivatedRoute,
        private router: Router,
        private socketIoService: SocketIoService
    ){
        this.data$ = combineLatest([
            this.service.actualBoard$.pipe(filter(Boolean)),
            this.service.columns$,
            this.service.tasks$
        ]).pipe(map(([actualBoard, columns, tasks]) => ({
            board: actualBoard,
            columns: columns,
            tasks: tasks
        })));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.boardId = params['id'];
            this.socketIoService.emit(SocketEvents.boardsJoin, { boardId: this.boardId });
            this.service.getBoard(this.boardId).subscribe((board) => {
                this.service.setActualBoard(board);
            });
            this.service.getColumns(this.boardId).subscribe(columns => {
                this.service.setColumns(columns);
            });
            this.service.getTasks(this.boardId).subscribe(tasks => {
                this.service.setTasks(tasks);
            });
        });
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart){
                console.log('Leaving the board!');
                this.service.setActualBoard(null);
                this.socketIoService.emit(SocketEvents.boardsLeave, { boardId: this.boardId });
                this.subscritions.forEach(subscrition => subscrition.unsubscribe())
            }
        });

        this.subscritions = [
            this.socketIoService.listem<Column>(SocketEvents.createColumnSucess).subscribe(column => {
                console.log(column);
                this.service.addColumn(column);
            }),
            this.socketIoService.listem<Task>(SocketEvents.createTaskSucess).subscribe(task => {
                console.log(task);
                this.service.addTask(task);
            }),
            this.socketIoService.listem<Task>(SocketEvents.deleteBoardSucess).subscribe(() => {
                this.router.navigateByUrl('/boards');
            }),
            this.socketIoService.listem<Task>(SocketEvents.updateColumnSucess).subscribe((column) => {
                console.log(column);
                this.service.updateColumnLocal(column);
            })
        ];
    }

    editTitle(title: string){
        console.log(title);
    }

    editTaskTitle(title: string){
        console.log(title);
    }

    editTaskDescription(description: string){
        console.log(description);
    }

    editTask(task: Task){
        console.log(task);
    }

    newColumn(title: string){
        const column: Column = {
            title: title,
            boardId: this.boardId
        };
        console.log(column);
        this.service.createColumn(column);
    }

    editColumn(title: string, column: Column){
        console.log({ ...column, title });
        this.service.updateColumn({ ...column, title });
    }

    newTask(title: string, column: Column){
        console.log(title);
        const newTask: Task = {
            title: title,
            description: title,
            boardId: this.boardId,
            columnId: column._id
        };
        console.log(newTask);
        this.service.createTask(newTask);
    }

    filterByColumn(tasks: Task[], columnId: string | undefined){
        return tasks.filter(task => task.columnId === columnId);
    }

    deleteBoard(){
        this.service.deleteBoard(this.boardId);
    }

    openTask(taskId?: string){
        this.router.navigate(['boards', this.boardId, 'tasks', taskId]);
    }
}
