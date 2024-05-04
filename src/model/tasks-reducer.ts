import { TaskType, TasksStateType } from "../App"
import { AddTodolistType, RemoveTodolistType } from "./todolists-reducer"
import { todolistID1, todolistID2 } from "./todolists-reducer"
import { v1 } from "uuid"


const initialState: TasksStateType = {
    [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
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
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? { ...t, isDone: action.payload.taskStatus }
                    : t)
            }
        }
        case "UPDATE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? { ...t, title: action.payload.title }
                    : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state }
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        // case "INITIALIZE-TASKS": {
        //     return {
        //         ...state, [action.payload.todolistId]: []
        //     }
        // }
        default: return state;
    }
}

type ActionType = RemoveTaskType | AddTaskType | UpdateTaskTitleType
    | ChangeTaskStatusType | AddTodolistType | RemoveTodolistType

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
// type InitializeTasksType = {
//     type: "INITIALIZE-TASKS"
//     payload: {
//         todolistId: string
//     }
// }

type UpdateTaskTitleType = {
    type: "UPDATE-TASK-TITLE"
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
export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}
// export const initializeTasksAC = (todolistId: string) => {
//     return {
//         type: "INITIALIZE-TASKS",
//         payload: {
//             todolistId
//         }
//     } as const
// }

