export interface UserAuth {
    id: string,
    email: string,
    token: string
}

export interface Task {
    id: string,
    title: string,
    description: string,
};

export interface TasksProviderHelpers {
    tasks: Array<Task>,
    updateTasks: Function,
    fetchTasks: Function,
    fetchCreateTask: Function,
    fetchUpdateTask: Function,
    fetchDeleteTask: Function,
}