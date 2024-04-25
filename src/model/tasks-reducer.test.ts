import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"

test('after remove task state.length-1', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()


    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: true },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task1Id, title: 'Rest API', isDone: true },
            { id: task2Id, title: 'GraphQL', isDone: false },
        ],
    }

    const action = {
        type: "REMOVE-TASK",
        payload: {
            taskId: task1Id,
            todolistId: todolistId1
        }
    } as const

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].every(el => el.id !== task1Id)).toBeTruthy()
});


test('after add task state.length+1', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()
    const task4Id = v1()


    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: true },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task1Id, title: 'Rest API', isDone: true },
            { id: task2Id, title: 'GraphQL', isDone: false },
        ],
    }

    const newTask = { id: task4Id, title: 'Redux', isDone: false }

    const action = {
        type: "ADD-TASK",
        payload: {
            todolistId: todolistId2,
            newTask: newTask
        }
    } as const

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2][0].id).toBe(task4Id)

});


test('after change task status to be changed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()



    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: false },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task1Id, title: 'Rest API', isDone: true },
            { id: task2Id, title: 'GraphQL', isDone: false },
        ],
    }


    const action = {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId: task2Id,
            taskStatus: true,
            todolistId: todolistId2
        }
    } as const

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2].find(el => el.id === task2Id)?.isDone).toBe(true)
    expect(endState[todolistId1].find(el => el.id === task2Id)?.isDone).toBeFalsy()
});


test('after update task title to be changed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()



    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: false },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task1Id, title: 'Rest API', isDone: true },
            { id: task2Id, title: 'GraphQL', isDone: false },
        ],
    }


    const action = {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todolistId: todolistId2,
            taskId: task2Id,
            title: 'newTitle'
        }
    } as const

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].title).toBe('newTitle')
    expect(endState[todolistId1][1].title).not.toBe('newTitle')
});



test('check new task array when added new todolist', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()



    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: false },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task1Id, title: 'Rest API', isDone: true },
            { id: task2Id, title: 'GraphQL', isDone: false },
        ],
    }


    const action = {
        type: "ADD-TODOLIST",
        payload: {
            title: 'newTodolistTitle',
            todolistId: v1(),
        }
    } as const

    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(3)
});