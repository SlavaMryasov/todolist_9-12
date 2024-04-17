import { totolistReducer } from "./todolists-reducer"
import { TodolistType } from "../App"
import { v1 } from "uuid"

test('4', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'what to learn', filter: 'all' },
        { id: todolistId2, title: 'what to buy', filter: 'all' },
    ]


    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1
        }
    } as const


    const endState = totolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})