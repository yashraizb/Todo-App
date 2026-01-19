import { useRecoilState } from "recoil";
import { list } from "../atom";
import { useState } from "react";
import type { Task, TaskGroup } from "../models";


type Props = {
    index: number
}


export default function TaskInput({ index }: Props) {
    const [task, setTask] = useState<string>("");
    const [listOfTasks, setListOfTasks] = useRecoilState<TaskGroup[]>(list);
    let tasks = [...listOfTasks[index].tasks];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (task.trim() === "") return;

        const newTask: Task = {
            id: Date.now(),
            name: task,
            completed: false,
            editing: false,
            selected: false,
        };
        tasks = [newTask, ...tasks];
        let newTaskGroup = { ...listOfTasks[index], tasks: tasks };
        let listOfTasksCopy = [...listOfTasks];
        listOfTasksCopy[index] = newTaskGroup;
        setListOfTasks([...listOfTasksCopy]);
        setTask("");
    };

    return (
        <div className="mb-3 row w-100">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control me-2 text-black bg-white"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task here"
                />
                <button type="submit" className="btn btn-primary rounded-pill">
                    Submit
                </button>
            </form>
        </div>
    );
}
