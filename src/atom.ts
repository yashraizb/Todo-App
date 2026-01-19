import { atom } from "recoil";
import type { Task, TaskGroup } from "./models";


export const taskListState = atom<Task[]>({
    key: 'taskListState',
    default: [],
});

export const list = atom<TaskGroup[]>({
    key: 'list',
    default: [],
});