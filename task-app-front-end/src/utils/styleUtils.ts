import { Task } from '../types/task.types';

export const STATUS_CLASSES: Record<Task['status'], string> = {
  'Todo': 'bg-yellow-100 text-yellow-800',
  'InProgress': 'bg-blue-100 text-blue-800',
  'Done': 'bg-green-100 text-green-800'
};

export const PRIORITY_CLASSES: Record<Task['priority'], string> = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-orange-100 text-orange-800',
  'High': 'bg-red-100 text-red-800'
};

export const getStatusClass = (status: Task['status']): string => {
  return STATUS_CLASSES[status] || 'bg-gray-100 text-gray-800';
};

export const getPriorityClass = (priority: Task['priority']): string => {
  return PRIORITY_CLASSES[priority] || 'bg-gray-100 text-gray-800';
};

export const STATUS_BUTTON_SELECTED_CLASSES: Record<Task['status'], string> = {
  'Todo': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  'InProgress': 'bg-blue-100 text-blue-800 border border-blue-300',
  'Done': 'bg-green-100 text-green-800 border border-green-300'
};

export const STATUS_BUTTON_HOVER_CLASSES: Record<Task['status'], string> = {
  'Todo': 'bg-gray-100 text-gray-600 hover:bg-yellow-50',
  'InProgress': 'bg-gray-100 text-gray-600 hover:bg-blue-50',
  'Done': 'bg-gray-100 text-gray-600 hover:bg-green-50'
};
