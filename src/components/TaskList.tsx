import { useRecoilState } from "recoil";
import { selectedTasks, taskListState } from "../atom";
import { useReducer, useState } from "react";
import type { Task, TaskAction } from "../models";

export default function TaskList() {
    const [tasks, setTasks] = useRecoilState<Task[]>(taskListState);
    const [selectedCnt, setSelectedCnt] = useRecoilState<number>(selectedTasks);
    const [selectGlobal, setSelectGlobal] = useState<boolean>(false);
    const [completedCnt, setCompletedCnt] = useState<number>(0);

    const handleToggle = (task: Task, index: number) => {
        const tasksCopy = [...tasks];
        console.log("Before Toggle:", task);
        if (!task.completed) {
            if(task.selected) {
                setSelectedCnt(selectedCnt - 1);
            }
            for (let i = index; i < tasksCopy.length; i++) {
                if (i + 1 < tasksCopy.length && tasksCopy[i + 1].completed) {
                    tasksCopy[i] = { ...task, completed: !task.completed, selected: false };
                    break;
                } else if (i + 1 < tasksCopy.length) {
                    tasksCopy[i] = tasksCopy[i + 1];
                } else if (i + 1 === tasksCopy.length) {
                    tasksCopy[i] = { ...task, completed: !task.completed, selected: false };
                }
            }
            setCompletedCnt(completedCnt + 1);
            if(completedCnt + 1 === tasks.length) {
                setSelectGlobal(true);
            }
        } else {
            setCompletedCnt(completedCnt - 1);
            if(completedCnt - 1 < tasks.length) {
                setSelectGlobal(false);
            }
            for (let i = index; i >= 0; i--) {
                if (i - 1 >= 0 && !tasksCopy[i - 1].completed) {
                    tasksCopy[i] = { ...task, completed: !task.completed };
                    break;
                } else if (i - 1 >= 0) {
                    tasksCopy[i] = tasksCopy[i - 1];
                } else if (i - 1 < 0) {
                    tasksCopy[i] = { ...task, completed: !task.completed };
                }
            }
        }
        setTasks(tasksCopy);
    };

    const handleRemove = (task: Task) => {
        setTasks(tasks.filter((t) => t.id !== task.id));
    };

    const handleSelect = (task: Task) => {
        if (task.selected && selectedCnt) {
            setSelectedCnt(selectedCnt - 1);
            if (selectedCnt === tasks.length) {
                setSelectGlobal(false);
            }
        } else {
            setSelectedCnt(selectedCnt + 1);
            if (selectedCnt === tasks.length - 1) {
                setSelectGlobal(true);
            }
        }
        const tasksCopy = tasks.map((t) => {
            if (t.id === task.id) {
                return { ...t, selected: !t.selected };
            }
            return t;
        });
        setTasks(tasksCopy);
    };

    const handleGlobalRemove = () => {
        const tasksCopy = tasks.filter((t) => !t.selected);
        setTasks(tasksCopy);
        setSelectedCnt(0);
        setSelectGlobal(false);
    };

    const handleGlobalToggle = () => {
        let tasksCopy = [...tasks];
        let status = false;
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].selected && tasksCopy[i].completed === status) {
                status = !status;
                break;
            }
        }
        let completed = 0;
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].selected) {
                tasksCopy[i] = { ...tasksCopy[i], completed: status };
                if (status) {
                    completed += 1;
                } else {
                    completed -= 1;
                }
                tasksCopy[i] = { ...tasksCopy[i], selected: false };
            }
        }

        setCompletedCnt(completed);

        let completedTasks = [], incompleteTasks = [];
        for (let i = 0; i < tasksCopy.length; i++) {
            if (tasksCopy[i].completed) {
                completedTasks.push(tasksCopy[i]);
            } else {
                incompleteTasks.push(tasksCopy[i]);
            }
        }
        const sortedTasks = [...incompleteTasks, ...completedTasks];
        // console.log("After Toggle:", sortedTasks);
        setSelectedCnt(0);
        setSelectGlobal(false);
        setTasks(sortedTasks);
    };

    const handleSelectAll = () => {
        const allSelected = selectedCnt === tasks.length;
        const tasksCopy = tasks.map((t) => ({ ...t, selected: !allSelected }));
        setTasks(tasksCopy);
        setSelectedCnt(allSelected ? 0 : tasks.length);
        setSelectGlobal(!allSelected);
    }

    return (
        <div className="border rounded overflow-hidden container">
            {/* selectedCnt: {selectedCnt}<br/>
            completedCnt: {completedCnt}<br/>
            selectGlobal: {selectGlobal.toString()}<br/> */}
            {/* <div className="table-responsive"> */}
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center" style={{ width: "1%" }}>
                                <input type="checkbox" onChange={handleSelectAll} checked={selectGlobal} />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col" className="text-center" style={{ width: "1%" }}>
                                <button
                                    className={
                                        "btn btn-danger btn-sm" +
                                        (selectedCnt === 0 ? " disabled" : "")
                                    }
                                    onClick={handleGlobalRemove}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </th>
                            <th scope="col" className="text-center" style={{ width: "1%" }}>
                                <button
                                    className={
                                        "btn btn-primary btn-sm" +
                                        (selectedCnt === 0 ? " disabled" : "")
                                    }
                                    onClick={handleGlobalToggle}
                                >
                                    <i className="bi bi-check"></i>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td className="text-center" style={{ width: "1%" }}>
                                    <input
                                        type="checkbox"
                                        checked={task.selected}
                                        onChange={() => handleSelect(task)}
                                    />
                                </td>
                                <td
                                    className={task.completed ? "text-decoration-line-through" : ""}
                                >
                                    {task.name}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemove(task)}
                                    >
                                        <i className="bi bi-trash"></i>{" "}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={
                                            "btn btn-sm " +
                                            (task.completed ? "btn-success" : "btn-primary")
                                        }
                                        onClick={() => handleToggle(task, index)}
                                    >
                                        <i className="bi bi-check"></i>{" "}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        // </div>
    );
}
