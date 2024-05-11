import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from "../App";


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>




type ActionsType = AddTodolistActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        default:
            return state;
    }
}


export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1()
    }
}


