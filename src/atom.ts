import { atom } from "recoil";
import type { Task } from "./models";


export const taskListState = atom<Task[]>({
    key: 'taskListState',
    default: [],
});

export const selectedTasks = atom<number>({
    key: 'selectedTasks',
    default: 0,
});