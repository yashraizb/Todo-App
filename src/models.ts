export interface Task {
    id: number;
    name: string;
    completed: boolean;
    editing: boolean;
    selected: boolean;
}


export interface TaskGroup {
    title: string;
    isChecked: boolean;
    tasks: Task[];
}