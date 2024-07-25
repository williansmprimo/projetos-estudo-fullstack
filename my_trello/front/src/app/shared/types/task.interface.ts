export interface Task {
    title: string;
    description: string;
    id?: string;
    boardId?: string;
    userId?: string;
    columnId?: string;
}