export interface Task {
    id: number;
    name: string;
    completed: boolean;
    editing: boolean;
    selected: boolean;
}

export interface AddOperation {
    state: "add";
    task: Task;
}

export interface RemoveOperation {
    state: "remove";
    task: Task;
}

export interface ToggleOperation {
    state: "toggle";
    task: Task;
}

export interface TaskAction {
    operation: AddOperation | RemoveOperation | ToggleOperation;
}