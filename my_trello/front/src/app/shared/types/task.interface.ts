export interface Task {
    title: string;
    description: string;
    id?: string;
    _id?: string;
    boardId?: string;
    userId?: string;
    columnId?: string;
}