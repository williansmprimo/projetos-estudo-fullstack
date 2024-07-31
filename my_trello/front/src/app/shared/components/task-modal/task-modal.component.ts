import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { filter, map, Observable } from "rxjs";
import { Task } from "../../types/task.interface";
import { BoardService } from "../../services/board.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'task-modal',
    templateUrl: './task-modal.component.html',
    styleUrl: './task-modal.component.css',
    standalone: true,
    imports: [
        ButtonModule,
        RouterModule,
        CommonModule
    ]
})
export class TaskModalCompoent implements OnInit{
    taskId = "";
    boardId = "";
    task$: Observable<Task>;

    constructor(private route: ActivatedRoute, private service: BoardService){
        this.task$ = this.service.tasks$
            .pipe(map(tasks => tasks.find(task => task._id === this.taskId)))
            .pipe(filter(Boolean));
    }

    ngOnInit(): void {
        this.taskId = this.route.snapshot.paramMap.get('taskId') || '';
        this.boardId = this.route.parent?.snapshot.paramMap.get('id') || '';
    }
}