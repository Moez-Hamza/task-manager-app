import prisma from '../config/db';
import { Prisma } from '@prisma/client';


type TaskUpdateInput = Prisma.TaskUpdateInput;


export class TaskModel {

  static async create(data: {
    title: string;
    description?: string;
    status?: 'Todo' | 'InProgress' | 'Done';
    dueDate: string | Date;
    priority?: 'Low' | 'Medium' | 'High';
    userId: string;
  }) {
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
    filters?: {
      status?: 'Todo' | 'InProgress' | 'Done';
      priority?: 'Low' | 'Medium' | 'High';
      sortBy?: string;
      order?: 'asc' | 'desc';
    }
  ) {
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


  static async findById(taskId: string) {
    return prisma.task.findUnique({
      where: { id: taskId }
    });
  }


  static async update(taskId: string, data: {
    title?: string;
    description?: string | null;
    status?: 'Todo' | 'InProgress' | 'Done';
    dueDate?: string | Date;
    priority?: 'Low' | 'Medium' | 'High';
  }) {
    // Convert date string to Date object if provided
    const updateData: TaskUpdateInput = { ...data };
    if (data.dueDate) {
      updateData.dueDate = new Date(data.dueDate);
    }
    
    return prisma.task.update({
      where: { id: taskId },
      data: updateData
    });
  }


  static async delete(taskId: string) {
    return prisma.task.delete({
      where: { id: taskId }
    });
  }
}
