import axios from 'axios';
import { Task } from '../app/dashboard/page';

const API_URL = 'http://localhost:5000/api';

interface TaskQueryParams {
  status?: string;
  priority?: string;
  sortBy?: string;
  order?: string;
}

/**
 * Get all tasks with optional filtering and sorting
 */
export const getTasks = async (token: string, queryParams?: TaskQueryParams): Promise<Task[]> => {
  try {
    const params = new URLSearchParams();
    
    if (queryParams?.status) params.append('status', queryParams.status);
    if (queryParams?.priority) params.append('priority', queryParams.priority);
    if (queryParams?.sortBy) params.append('sortBy', queryParams.sortBy);
    if (queryParams?.order) params.append('order', queryParams.order);
    
    const response = await axios.get(`${API_URL}/tasks?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (token: string, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing task
 */
export const updateTask = async (token: string, taskId: string, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (token: string, taskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
