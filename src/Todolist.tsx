import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	todolistID:string
	title: string
	tasks: TaskType[]
	removeTask: (todoListID: string,taskId: string) => void
	changeFilter: (todoListID:string,filter: FilterValuesType) => void
	addTask: (todoListID: string, title: string) => void
	changeTaskStatus: (todoListID: string, taskId: string, taskStatus: boolean) => void
	filter: FilterValuesType
	deleteTodoList: (todolistID: string)=> void
}

export const Todolist = (props: PropsType) => {
	//todo:сделать после занятия

	// let tasksForTodolist = tasks
	// if (todolists[1].filter === 'active') {
	// 	tasksForTodolist = tasks.filter(task => !task.isDone)
	// }
	// if (todolists[1].filter === 'completed') {
	// 	tasksForTodolist = tasks.filter(task => task.isDone)
	// }


	const {todolistID,title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, deleteTodoList} = props

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(todolistID,taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(todolistID,filter)
	}

	const deleteTodoListHandler = (todoID:string) => {
		deleteTodoList(todoID)
	}

	return (
		<div>
			<h3>{title}</h3>
			<button onClick={()=>deleteTodoListHandler(todolistID)}>x</button>
			<div>
				<input
					className={error ? 'error': ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div> }
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(todolistID,task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todolistID,task.id, newStatusValue)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
