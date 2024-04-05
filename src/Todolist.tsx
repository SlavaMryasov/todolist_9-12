import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
  todoListID: string;
  title: string;
  tasks: TaskType[];
  removeTask: (todoListID: string, taskId: string) => void;
  changeFilter: (todoListID: string, filter: FilterValuesType) => void;
  addItem: (title: string, todoListID: string) => void;
  changeTaskStatus: (
    todoListID: string,
    taskId: string,
    taskStatus: boolean
  ) => void;
  filter: FilterValuesType;
  updateTaskTitle: (
    todoListID: string,
    taskId: string,
    newTitle: string
  ) => void;
  updateTodoListTitle: (todoListID: string, newTitle: string)=> void
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    todoListID,
    removeTask,
    changeFilter,
    addItem,
    changeTaskStatus,
    updateTaskTitle,
    updateTodoListTitle,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    console.log(props.todoListID);
    changeFilter(todoListID, filter);
  };

  const addItemHandler = (title: string) => {
    addItem(todoListID, title);
  };

  const updateTitleHandler = (taskID: string, newValue: string) => {
    updateTaskTitle(todoListID, taskID, newValue);
  };
  const updateTodoListTitleHandler = (newValue: string) => {
    updateTodoListTitle(todoListID, newValue);
  };


  
  return (
    <div>
      <h3>
        {" "}
        <EditableSpan
          title={title}
          setNewValue={(newValue) => {
            updateTodoListTitleHandler(newValue);
          }}
        />
      </h3>
      <AddItemForm addItem={addItemHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(todoListID, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(todoListID, task.id, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  setNewValue={(newValue) => {
                    updateTitleHandler(task.id, newValue);
                  }}
                />
                <Button onClick={removeTaskHandler} title={"x"} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
