import { TaskModel } from '../models/task.model';
import { TaskCreateInput, TaskUpdateInput, TaskFilters, Task } from '../types/task.types';

export class TaskService {

  static async createTask(userId: string, taskData: TaskCreateInput): Promise<Task> {
    return TaskModel.create({ ...taskData, userId });
  }

  static async getTasks(userId: string, filters?: TaskFilters): Promise<Task[]> {
    return TaskModel.findByUserId(userId, filters);
  }

  static async getTaskById(taskId: string, userId: string): Promise<Task> {
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
    taskData: TaskUpdateInput
  ): Promise<Task> {
    await this.getTaskById(taskId, userId);
    return TaskModel.update(taskId, taskData);
  }

  static async deleteTask(taskId: string, userId: string): Promise<{ id: string }> {
    await this.getTaskById(taskId, userId);
    return TaskModel.delete(taskId);
  }
}
