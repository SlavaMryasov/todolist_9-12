import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType, TaskType, TodolistType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from "./model/tasks-reducer";
import { changeFilterAC, removeTodolistAC, updateTodolistAC } from "./model/todolists-reducer";
import { v1 } from 'uuid';
import { useSelector } from 'react-redux';
import { AppRootState } from './model/store';

type PropsType = {
	todolist: TodolistType
}

export const Todolist = ({ todolist }: PropsType) => {

	let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])
	const dispatch = useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeFilterAC(filter, todolist.id))
	}

	const addTaskHandler = (title: string) => {
		const newTask = { id: v1(), title: title, isDone: false }
		dispatch(addTaskAC(todolist.id, newTask))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(updateTodolistAC(todolist.id, title))
	}

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(todolist.id))
	}

	if (todolist.filter === 'active') {
		tasks = tasks.filter(task => !task.isDone)
	}

	if (todolist.filter === 'completed') {
		tasks = tasks.filter(task => task.isDone)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler} /></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskHandler} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {
							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, todolist.id))
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								dispatch(changeTaskStatusAC(task.id, newStatusValue, todolist.id))
							}

							const changeTaskTitleHandler = (title: string) => {
								dispatch(updateTaskTitleAC(todolist.id, task.id, title))
							}
							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={todolist.filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={() => changeFilterTasksHandler('all')}>
					All
				</Button>
				<Button
					variant={todolist.filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={() => changeFilterTasksHandler('active')}>
					Active
				</Button>
				<Button
					variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={() => changeFilterTasksHandler('completed')}>
					Completed
				</Button>
			</Box>
		</div>
	)
}
