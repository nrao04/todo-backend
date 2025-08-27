export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  color: string;
}

export interface UpdateTaskRequest {
  title?: string;
  color?: string;
  completed?: boolean;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface TasksResponse extends ApiResponse<Task[]> {
  data: Task[];
}

export interface TaskResponse extends ApiResponse<Task> {
  data: Task;
}
