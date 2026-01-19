import { useRecoilState } from "recoil";
import { taskListState } from "../atom";
import { useState } from "react";
import type { Task } from "../models";

export default function TaskInput() {
    const [tasks, setTasks] = useRecoilState(taskListState);
    const [task, setTask] = useState<string>("");

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
        setTasks([...tasks, newTask]);
        setTask("");
    };

    return (
        <div className="mb-3 row">
            <div className="col-sm-10">
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control me-2 rounded-5"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter task here"
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
