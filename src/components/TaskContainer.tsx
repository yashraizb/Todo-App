import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

export default function TaskContainer() {
    return (
        <div className="container mt-4">
            <TaskInput />
            <TaskList />
        </div>
    )
}