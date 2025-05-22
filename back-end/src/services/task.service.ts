import { TaskModel } from '../models/task.model';


export class TaskService {

  static async createTask(userId: string, taskData: {
    title: string;
    description?: string;
    status?: 'Todo' | 'InProgress' | 'Done';
    dueDate: string;
    priority?: 'Low' | 'Medium' | 'High';
  }) {
    return TaskModel.create({
      ...taskData,
      userId
    });
  }
  

  static async getTasks(
    userId: string,
    filters?: {
      status?: 'Todo' | 'InProgress' | 'Done';
      priority?: 'Low' | 'Medium' | 'High';
      sortBy?: string;
      order?: 'asc' | 'desc';
    }
  ) {
    return TaskModel.findByUserId(userId, filters);
  }
  

  static async getTaskById(taskId: string, userId: string) {
    const task = await TaskModel.findById(taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }
    
    if (task.userId !== userId) {
      throw new Error('Not authorized to access this task');
    }
    
    return task;
  }
  

  static async updateTask(
    taskId: string,
    userId: string,
    taskData: {
      title?: string;
      description?: string | null;
      status?: 'Todo' | 'InProgress' | 'Done';
      dueDate?: string;
      priority?: 'Low' | 'Medium' | 'High';
    }
  ) {
    await this.getTaskById(taskId, userId);
    return TaskModel.update(taskId, taskData);
  }
  
 
  static async deleteTask(taskId: string, userId: string) {
    await this.getTaskById(taskId, userId);
    return TaskModel.delete(taskId);
  }
}
