import { FilterValuesType, TaskType } from "./App"
import { v1 } from "uuid"

export const tasksReducer = (state: TaskType[], action: ActionTypes): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(task => task.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.payload.title, isDone: false }
            return [newTask, ...state]
        }
        case 'CHANGE-FILTER': {
            return action.payload.filter
        }
        default: return state
    }
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeFilterActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
    }
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
    }
}

type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    payload: {
        filter: FilterValuesType
    }
}

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id
        }
    } as const
}

export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}

export const changeFilterAC = (filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filter
        }
    } as const
}

