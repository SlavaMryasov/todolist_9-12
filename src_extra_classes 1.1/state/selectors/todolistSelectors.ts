import { TodolistType } from "../../App";
import { AppRootStateType } from "../store";


export const todolistsSelector = (state: AppRootStateType): TodolistType[] => state.todolists