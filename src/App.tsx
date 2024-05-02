import './App.css';
import { Todolist } from "./Todolist";
import React, { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import { changeFilterAC, updateTodolistAC } from './model/todolists-reducer';
import { removeTodolistAC } from './model/todolists-reducer';
import { addTodolistAC } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC } from './model/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './model/store';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

	const dispatch = useDispatch() // просто получаем функцию из библиотеки, которая может диспатчить экшен в стор
	const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists) // достаем что нужно из стейта
	const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC(taskId, todolistId))
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = { id: v1(), title: title, isDone: false }
		dispatch(addTaskAC(title, todolistId, newTask))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId))
	}


	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(updateTaskTitleAC(todolistId, taskId, title))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatch(changeFilterAC(filter, todolistId))
	}

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}


	const addTodolist = (title: string) => {
		const todolistId = v1()
		dispatch(addTodolistAC(title, todolistId))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(updateTodolistAC(todolistId, title))
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static" sx={{ mb: '31px' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm
						addItem={addTodolist}
					/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid>
								<Paper sx={{ p: '0 19px 20px 20px' }}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTask={updateTask}
										updateTodolist={updateTodolist}

									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
