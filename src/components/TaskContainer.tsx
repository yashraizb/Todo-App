import TaskList from "./TaskList";
import { useRecoilState } from "recoil";
import { list } from "../atom";
import type { TaskGroup } from "../models";
import { useEffect } from "react";

export default function TaskContainer() {
    const [listOfTasks, setListOfTasks] = useRecoilState<TaskGroup[]>(list);

    useEffect(() => {
        setListOfTasks([
            {
                title: 'List 1',
                isChecked: true,
                tasks: [
                    {
                        id: 1,
                        name: 'Task 1',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 2,
                        name: 'Task 2',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 3,
                        name: 'Task 3',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 4,
                        name: 'Task 4',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 5,
                        name: 'Task 5',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 6,
                        name: 'Task 6',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 7,
                        name: 'Task 7',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 8,
                        name: 'Task 8',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 9,
                        name: 'Task 9',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 10,
                        name: 'Task 10',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 11,
                        name: 'Task 11',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 12,
                        name: 'Task 12',
                        completed: false,
                        editing: false,
                        selected: false
                    }
                ]
            },
            {
                title: 'List 2',
                isChecked: true,
                tasks: [
                    {
                        id: 3,
                        name: 'Task 3',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 4,
                        name: 'Task 4',
                        completed: false,
                        editing: false,
                        selected: false
                    }
                ]
            },
            {
                title: 'List 3',
                isChecked: false,
                tasks: [
                    {
                        id: 1,
                        name: 'Task 1',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 2,
                        name: 'Task 2',
                        completed: false,
                        editing: false,
                        selected: false
                    }
                ]
            },
            {
                title: 'List 4',
                isChecked: false,
                tasks: [
                    {
                        id: 3,
                        name: 'Task 3',
                        completed: false,
                        editing: false,
                        selected: false
                    },
                    {
                        id: 4,
                        name: 'Task 4',
                        completed: false,
                        editing: false,
                        selected: false
                    }
                ]
            }
        ])
    }, [])

    return (
        <div className="container mt-4" style={{ minWidth: '400px' }}>
            <div className="row mt-4 g-4">
                {listOfTasks.map((group, index) => (
                    group.isChecked && (
                        <div className="col-12 col-md-5 ms-5 me-auto bg-dark rounded-3 border shadow" key={"div-" + index.toString()}>
                            <h3 className="text-center text-white mt-2">{group.title}</h3>
                            <TaskList taskGroup={listOfTasks} index={index} setTasks={setListOfTasks} />
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}
