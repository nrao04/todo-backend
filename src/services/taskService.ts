import { prisma } from '../lib/prisma';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { TASK_CONSTRAINTS } from '../constants';

export class TaskService {
  async getAllTasks(): Promise<Task[]> {
    return await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(data: CreateTaskRequest): Promise<Task> {
    return await prisma.task.create({
      data: {
        title: data.title,
        color: data.color,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        priority: data.priority || TASK_CONSTRAINTS.DEFAULT_PRIORITY,
      },
    });
  }

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    const updateData: any = { ...data };

    // Convert dueDate string to Date object if provided
    if (data.dueDate) {
      updateData.dueDate = new Date(data.dueDate);
    }

    return await prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteTask(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }

  async toggleTaskCompletion(id: string): Promise<Task> {
    const currentTask = await this.getTaskById(id);

    if (!currentTask) {
      throw new Error('Task not found');
    }

    return await prisma.task.update({
      where: { id },
      data: { completed: !currentTask.completed },
    });
  }

  async getTasksByStatus(completed: boolean): Promise<Task[]> {
    return await prisma.task.findMany({
      where: { completed },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskStats(): Promise<{ total: number; completed: number; pending: number }> {
    const [total, completed] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { completed: true } }),
    ]);

    return {
      total,
      completed,
      pending: total - completed,
    };
  }
}

export const taskService = new TaskService();
