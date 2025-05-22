export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'Todo' | 'InProgress' | 'Done';
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
};

export interface TaskQueryParams {
  status?: string;
  priority?: string;
  sortBy?: string;
  order?: string;
}

export type TaskCreateInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type TaskUpdateInput = Partial<Task>;
