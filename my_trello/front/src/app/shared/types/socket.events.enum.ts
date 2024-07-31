export enum SocketEvents {
    boardsJoin = 'boards:join',
    boardsLeave = 'boards:leave',

    createColumn = 'column:create',
    createColumnSucess = 'column:create:sucess',
    createColumnFail = 'column:create:fail',

    createTask = 'task:create',
    createTaskSucess = 'task:create:sucess',
    createTaskFail = 'task:create:fail',

    deleteBoard = 'board:delete',
    deleteBoardSucess = 'board:delete:sucess',
    deleteBoardFail = 'board:delete:fail',

    updateColumn = 'column:update',
    updateColumnSucess = 'column:update:sucess',
    updateColumnFail = 'column:update:fail'
}