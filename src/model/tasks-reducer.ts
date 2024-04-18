import { TaskType, TasksStateType } from "../App"


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [action.payload.newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.taskId
                    ? { ...t, isDone: action.payload.taskStatus }
                    : t)
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? { ...t, title: action.payload.title }
                    : t)
            }
        }
        default: return state
    }
}

type ActionType = RemoveTaskType | AddTaskType | UpdateTaskType | ChangeTaskStatusType

type RemoveTaskType = {
    type: "REMOVE-TASK"
    payload: {
        taskId: string
        todolistId: string
    }
}

type AddTaskType = {
    type: "ADD-TASK"
    payload: {
        title: string
        todolistId: string
        newTask: TaskType
    }
}

type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        taskId: string
        taskStatus: boolean
        todolistId: string
    }
}

type UpdateTaskType = {
    type: "UPDATE-TASK"
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string, newTask: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId,
            newTask
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            taskStatus,
            todolistId
        }
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}