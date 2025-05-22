export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: Date;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done'
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate: string;
  priority?: TaskPriority;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  dueDate?: string;
  priority?: TaskPriority;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: Date;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
