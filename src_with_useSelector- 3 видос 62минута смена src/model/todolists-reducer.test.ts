import { todolistsReducer } from "./todolists-reducer"
import { TodolistType } from "../App"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string

let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'what to learn', filter: 'all' },
        { id: todolistId2, title: 'what to buy', filter: 'all' },
    ]
})



test('after remove todolist, length-1', () => {

    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1
        }
    } as const


    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})


test('after added todolist, leght+1', () => {

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: '22',
            todolistId: v1(),
        }
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('22')
    expect(endState[2].title).not.toBe('22')
})


test('title updates correctly', () => {

    const action = {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistId: todolistId1,
            title: 'some kind of name',
        }
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('some kind of name')

})


test('filter before update will be correct', () => {

    const action = {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId: todolistId1,
            filter: 'active',
        }
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('active')

})