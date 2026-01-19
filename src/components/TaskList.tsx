import { useRecoilState, type SetterOrUpdater } from "recoil";
import { useEffect, useState } from "react";
import type { Task, TaskGroup } from "../models";
import TaskInput from "./TaskInput";


type Props = {
    taskGroup: TaskGroup[];
    index: number;
    setTasks: SetterOrUpdater<TaskGroup[]>;
};


export default function TaskList({ taskGroup, index, setTasks }: Props) {
    // const [tasks, setTasks] = useRecoilState<Task[]>(taskListState);
    let tasks = [...taskGroup[index!].tasks];
    let taskGroupCopy = [...taskGroup];
    const [selectedCnt, setSelectedCnt] = useState<number>(0);
    const [selectGlobal, setSelectGlobal] = useState<boolean>(false);
    const [completedCnt, setCompletedCnt] = useState<number>(0);

    const handleToggle = (task: Task, index: number) => {
        let tasksCopy = [...tasks];
        if (!task.completed) {
            if (task.selected) {
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
        } else {
            setCompletedCnt(completedCnt - 1);
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
        taskGroupCopy[index!] = {...taskGroupCopy[index!], tasks: tasksCopy};
        setTasks([...taskGroupCopy]);
    };

    const handleRemove = (task: Task) => {
        // setTasks(tasks.filter((t) => t.id !== task.id));
        let tasksCopy = tasks.filter((t) => t.id !== task.id);
        taskGroupCopy[index!] = {...taskGroupCopy[index!], tasks: tasksCopy};
        setTasks([...taskGroupCopy]);
        setSelectedCnt(selectedCnt - 1);
    };

    const handleSelect = (task: Task) => {
        if (task.selected && selectedCnt) {
            setSelectedCnt(selectedCnt - 1);
        } else {
            setSelectedCnt(selectedCnt + 1);
        }
        let tasksCopy = tasks.map((t) => {
            if (t.id === task.id) {
                return { ...t, selected: !t.selected };
            }
            return t;
        });
        taskGroupCopy[index!] = {...taskGroupCopy[index!], tasks: tasksCopy};
        setTasks([...taskGroupCopy]);
    };

    const handleGlobalRemove = () => {
        let tasksCopy = tasks.filter((t) => !t.selected);
        taskGroupCopy[index!] = {...taskGroupCopy[index!], tasks: tasksCopy};
        setSelectedCnt(0);
        setTasks([...taskGroupCopy]);
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
        setSelectedCnt(0);
        taskGroupCopy[index!] = {...taskGroupCopy[index!], tasks: sortedTasks};
        setTasks([...taskGroupCopy]);
    };

    const handleSelectAll = () => {
        const allSelected = selectedCnt === tasks.length;
        let tasksCopy = tasks.map((t) => ({ ...t, selected: !allSelected }));
        taskGroupCopy[index!] = { ...taskGroupCopy[index!], tasks: tasksCopy };
        setTasks([...taskGroupCopy]);
        setSelectedCnt(allSelected ? 0 : tasks.length);
    }

    useEffect(() => {
        if (selectedCnt === tasks.length && tasks.length > 0) {
            setSelectGlobal(true);
        } else {
            setSelectGlobal(false);
        }
    }, [selectedCnt]);

    return (
        <div className="overflow-hidden" key={"tg-" + index.toString()}>
            <TaskInput index={index} />
            <div className="table-responsive overflow-y-auto" style={{
                maxHeight: "250px",
                minHeight: "auto"
            }}>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="table-dark">
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
                            <tr className="table-dark" key={task.id}>
                                <td className="text-center table-dark" style={{ width: "1%" }}>
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
        </div>
    );
}
