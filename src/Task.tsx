import { Checkbox, CheckboxProps } from "@mui/material"
import { EditableSpan, EditableSpanPropsType } from "./EditableSpan"
import { IconButtonMemo, TaskType } from "./Todolist"
import { ChangeEvent, memo } from "react"


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = memo(({ task, todolistId, changeTaskTitle, changeTaskStatus, removeTask }: TaskPropsType) => {
    console.log('Task')
    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }
    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone} color="primary" onChange={onChangeHandler} />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
            <IconButtonMemo onClick={onClickHandler} />
        </div>
    )
})