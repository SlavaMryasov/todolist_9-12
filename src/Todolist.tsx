import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, ButtonProps, Checkbox, IconButton, IconButtonTypeMap } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { Task } from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [])

    let tasks = props.tasks
    tasks = useMemo(() => {
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [tasks, props.filter])


    return <div>
        <h3>
            <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButtonMemo onClick={removeTodolist} />
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasks.map(t => {
                    return (
                        <Task key={t.id} task={t} todolistId={props.id} changeTaskTitle={props.changeTaskTitle}
                            changeTaskStatus={props.changeTaskStatus} removeTask={props.removeTask} />
                    )
                })
            }
        </div>
        <div style={{ paddingTop: "10px" }}>
            <ButtonMemo variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
                title={'ALL'}
            />
            <ButtonMemo variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
                title={'ACTIVE'} />
            <ButtonMemo variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
                title={'COMPLETED'} />
        </div>
    </div>
}
)

type ButtonMemoType = {} & ButtonProps

export const ButtonMemo = memo(({ variant, onClick, color, title, ...rest }: ButtonMemoType) => {
    return <Button variant={variant} onClick={onClick} color={color} {...rest}>{title}</Button>
})

type IconButtonMemoType = {} & IconButtonTypeMap & DefaultComponentProps<any>
export const IconButtonMemo = memo(({ onClick, ...rest }: IconButtonMemoType) => {
    return <IconButton onClick={onClick} ><Delete /></IconButton>
})










// const prevProp = useRef(props.title)
// useEffect(() => {
//     if (prevProp.current !== title) {
//         console.log('проп изменился')
//     } else {
//         console.log('про не изменился')
//     }
// })




// const prevIdRef = useRef(props.id);
// const prevTitleRef = useRef(props.title);
// const prevTasksRef = useRef(props.tasks);
// const prevRemoveTaskRef = useRef(props.removeTask);
// const prevChangeFilterRef = useRef(props.changeFilter);
// const prevAddTaskRef = useRef(props.addTask);
// const prevChangeTaskStatusRef = useRef(props.changeTaskStatus);
// const prevRemoveTodolistRef = useRef(props.removeTodolist);
// const prevChangeTodolistTitleRef = useRef(props.changeTodolistTitle);
// const prevFilterRef = useRef(props.filter);
// const prevChangeTaskTitleRef = useRef(props.changeTaskTitle);

// useEffect(() => {
//     if (prevIdRef.current !== props.id) {
//         console.log('id ИЗМЕНИЛСЯ');
//         prevIdRef.current = props.id;
//     } else {
//         console.log('id остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevTitleRef.current !== props.title) {
//         console.log('title ИЗМЕНИЛСЯ');
//         prevTitleRef.current = props.title;
//     } else {
//         console.log('title остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevTasksRef.current !== props.tasks) {
//         console.log('tasks ИЗМЕНИЛСЯ');
//         prevTasksRef.current = props.tasks;
//     } else {
//         console.log('tasks остались неизменными');
//     }
// });

// useEffect(() => {
//     if (prevRemoveTaskRef.current !== props.removeTask) {
//         console.log('removeTask ИЗМЕНИЛСЯ');
//         prevRemoveTaskRef.current = props.removeTask;
//     } else {
//         console.log('removeTask остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevChangeFilterRef.current !== props.changeFilter) {
//         console.log('changeFilter  ИЗМЕНИЛСЯ');
//         prevChangeFilterRef.current = props.changeFilter;
//     } else {
//         console.log('changeFilter остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevAddTaskRef.current !== props.addTask) {
//         console.log('addTask ИЗМЕНИЛСЯ');
//         prevAddTaskRef.current = props.addTask;
//     } else {
//         console.log('addTask остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevChangeTaskStatusRef.current !== props.changeTaskStatus) {
//         console.log('changeTaskStatus  ИЗМЕНИЛСЯ');
//         prevChangeTaskStatusRef.current = props.changeTaskStatus;
//     } else {
//         console.log('changeTaskStatus остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevRemoveTodolistRef.current !== props.removeTodolist) {
//         console.log('removeTodolist  ИЗМЕНИЛСЯ');
//         prevRemoveTodolistRef.current = props.removeTodolist;
//     } else {
//         console.log('removeTodolist остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevChangeTodolistTitleRef.current !== props.changeTodolistTitle) {
//         console.log('changeTodolistTitle  ИЗМЕНИЛСЯ');
//         prevChangeTodolistTitleRef.current = props.changeTodolistTitle;
//     } else {
//         console.log('changeTodolistTitle остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevFilterRef.current !== props.filter) {
//         console.log('filter ИЗМЕНИЛСЯ');
//         prevFilterRef.current = props.filter;
//     } else {
//         console.log('filter остался неизменным');
//     }
// });

// useEffect(() => {
//     if (prevChangeTaskTitleRef.current !== props.changeTaskTitle) {
//         console.log('changeTaskTitle ИЗМЕНИЛСЯ');
//         prevChangeTaskTitleRef.current = props.changeTaskTitle;
//     } else {
//         console.log('changeTaskTitle остался неизменным');
//     }
// });
