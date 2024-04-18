import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"

test('after remove task state.length-1', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const task1Id = v1()
    const task2Id = v1()
    const task3Id = v1()
    const task4Id = v1()
    const task5Id = v1()

    let startState: TasksStateType = {
        [todolistId1]: [
            { id: task1Id, title: 'HTML&CSS', isDone: true },
            { id: task2Id, title: 'JS', isDone: true },
            { id: task3Id, title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: task4Id, title: 'Rest API', isDone: true },
            { id: task5Id, title: 'GraphQL', isDone: false },
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
})