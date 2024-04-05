import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodoListType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const removeTask = (todoListID: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].filter((el) => el.id !== taskId),
    });
    // const filteredTasks = tasks.filter((task) => {
    // 	return task.id !== taskId
    // })
    // setTasks(filteredTasks)
  };

  const addTask = (todoListID: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
  };
  const changeFilter = (todoListID: string, newFilter: FilterValuesType) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todoListID ? { ...el, filter: newFilter } : el
      )
    );

    // const currentTodoList = todolists.find(el => el.id === todoListID)
    // if(currentTodoList){ currentTodoList.filter = newFilter}
    // setTodolists([...todolists])
  };

  const changeTaskStatus = (
    todoListID: string,
    taskId: string,
    taskStatus: boolean
  ) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((el) =>
        el.id === taskId ? { ...el, isDone: taskStatus } : el
      ),
    });
  };

  const addTodoList = (title: string) => {
    const todoListId = v1();
    const newTodoList: TodoListType = { id: todoListId, title, filter: "all" };
    setTodolists([newTodoList, ...todolists]);
    setTasks({ ...tasks, [todoListId]: [] });
  };

  const updateTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
    // console.log(newTitle)
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    });
  };

  const updateTodoListTitle = (todoListID: string, newTitle: string) => {
    setTodolists(todolists.map(el => el.id === todoListID 
    ?{...el, title:newTitle}
    : el
    ))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todolists.map((el) => {
        let tasksForTodoList = tasks[el.id];
        if (el.filter === "active") {
          tasksForTodoList = tasks[el.id].filter((task) => !task.isDone);
        }

        if (el.filter === "completed") {
          tasksForTodoList = tasks[el.id].filter((task) => task.isDone);
        }

        return (
          <Todolist
            todoListID={el.id}
            key={el.id}
            title={el.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addItem={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={el.filter}
            updateTaskTitle={updateTaskTitle}
            updateTodoListTitle={updateTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
