export interface UserAuth {
  id: string;
  email: string;
  token: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
}
export interface TaskItemProps {
  task: Task;
}

export interface TasksProviderHelpers {
  tasks: Array<Task>;
  updateTasks: Function;
  fetchTasks: Function;
  fetchCreateTask: Function;
  fetchUpdateTask: Function;
  fetchDeleteTask: Function;
}

export interface AuthProviderHelpers {
  isAuthorized: boolean;
  updateIsAuthorized: Function;
  clearClientAuthorization: Function;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginFormErrors extends LoginForm {
  apiError?: string;
}

export interface RegistrationForm {
  email: string;
  password: string;
  passwordReenter: string;
}

export interface RegistrationFormErrors extends RegistrationForm {
  apiError?: string;
}
