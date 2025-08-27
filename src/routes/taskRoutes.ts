import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { validateRequest, validateParams } from '../middleware/validation';
import { TASK_CONSTRAINTS, TASK_COLORS, STATUS_MESSAGES } from '../constants';
import { taskService } from '../services/taskService';
import { sendSuccess, sendCreated, sendNoContent, sendError } from '../utils/response';

const router = Router();

// Validation schemas
const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(
      TASK_CONSTRAINTS.TITLE_MAX_LENGTH,
      `Title must be ${TASK_CONSTRAINTS.TITLE_MAX_LENGTH} characters or less`
    ),
  color: z.string().refine((val) => TASK_COLORS.includes(val as any), {
    message: `Color must be one of: ${TASK_COLORS.join(', ')}`,
  }),
});

const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(
      TASK_CONSTRAINTS.TITLE_MAX_LENGTH,
      `Title must be ${TASK_CONSTRAINTS.TITLE_MAX_LENGTH} characters or less`
    )
    .optional(),
  color: z
    .string()
    .refine((val) => TASK_COLORS.includes(val as any), {
      message: `Color must be one of: ${TASK_COLORS.join(', ')}`,
    })
    .optional(),
  completed: z.boolean().optional(),
});

// GET /api/tasks - Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    sendSuccess(res, tasks, 'Tasks retrieved successfully');
  } catch (error) {
    console.error('Error fetching tasks:', error);
    sendError(res, 'Failed to fetch tasks', 500);
  }
});

// GET /api/tasks/stats - Get task statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await taskService.getTaskStats();
    sendSuccess(res, stats, 'Task statistics retrieved successfully');
  } catch (error) {
    console.error('Error fetching task stats:', error);
    sendError(res, 'Failed to fetch task statistics', 500);
  }
});

// GET /api/tasks/completed - Get completed tasks
router.get('/completed', async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasksByStatus(true);
    sendSuccess(res, tasks, 'Completed tasks retrieved successfully');
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    sendError(res, 'Failed to fetch completed tasks', 500);
  }
});

// GET /api/tasks/pending - Get pending tasks
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasksByStatus(false);
    sendSuccess(res, tasks, 'Pending tasks retrieved successfully');
  } catch (error) {
    console.error('Error fetching pending tasks:', error);
    sendError(res, 'Failed to fetch pending tasks', 500);
  }
});

// POST /api/tasks - Create a new task
router.post('/', validateRequest(createTaskSchema), async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body);
    sendCreated(res, task, STATUS_MESSAGES.TASK_CREATED);
  } catch (error) {
    console.error('Error creating task:', error);
    sendError(res, 'Failed to create task', 500);
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', validateRequest(updateTaskSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.updateTask(id, req.body);
    sendSuccess(res, task, STATUS_MESSAGES.TASK_UPDATED);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Task not found')) {
      return sendError(res, STATUS_MESSAGES.TASK_NOT_FOUND, 404);
    }

    console.error('Error updating task:', error);
    sendError(res, 'Failed to update task', 500);
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    sendNoContent(res);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return sendError(res, STATUS_MESSAGES.TASK_NOT_FOUND, 404);
    }

    console.error('Error deleting task:', error);
    sendError(res, 'Failed to delete task', 500);
  }
});

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.toggleTaskCompletion(id);
    sendSuccess(res, task, 'Task completion toggled successfully');
  } catch (error) {
    if (error instanceof Error && error.message.includes('Task not found')) {
      return sendError(res, STATUS_MESSAGES.TASK_NOT_FOUND, 404);
    }

    console.error('Error toggling task:', error);
    sendError(res, 'Failed to toggle task', 500);
  }
});

export { router as taskRoutes };
