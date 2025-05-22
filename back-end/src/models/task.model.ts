import prisma from '../config/db';
import { Prisma } from '@prisma/client';
import { Task, TaskCreateInput, TaskUpdateInput, TaskFilters } from '../types/task.types';



type PrismaTaskUpdateInput = Prisma.TaskUpdateInput;

export class TaskModel {
  static async create(data: TaskCreateInput & { userId: string }): Promise<Task> {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || 'Todo',
        dueDate: new Date(data.dueDate),
        priority: data.priority || 'Medium',
        user: {
          connect: { id: data.userId }
        }
      }
    });
  }


  static async findByUserId(
    userId: string,
    filters?: TaskFilters
  ): Promise<Task[]> {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = filters || {};
    
    const where: Prisma.TaskWhereInput = { userId };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    
    const orderBy: Prisma.TaskOrderByWithRelationInput = {
      [sortBy]: order
    };
    
    return prisma.task.findMany({
      where,
      orderBy,
    });
  }


  static async findById(taskId: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id: taskId }
    });
  }


  static async update(taskId: string, data: TaskUpdateInput): Promise<Task> {
    const updateData: PrismaTaskUpdateInput = { ...data };
    if (data.dueDate) {
      updateData.dueDate = new Date(data.dueDate);
    }
    
    return prisma.task.update({
      where: { id: taskId },
      data: updateData
    });
  }


  static async delete(taskId: string): Promise<Task> {
    return prisma.task.delete({
      where: { id: taskId }
    });
  }
}
