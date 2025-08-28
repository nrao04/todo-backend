// API Constants
export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  HEALTH: '/health',
} as const;

// Task Constants
export const TASK_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 255,
  COLOR_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  DEFAULT_COLOR: 'blue',
  DEFAULT_PRIORITY: 'medium',
} as const;

// HTTP Status Messages
export const STATUS_MESSAGES = {
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TASK_NOT_FOUND: 'Task not found',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Internal server error',
} as const;

// Color Options for Tasks
export const TASK_COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'gray',
] as const;

export type TaskColor = (typeof TASK_COLORS)[number];

// Priority Options for Tasks
export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
