import api from './api';
import { Task, TaskFormData } from '../types';

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: TaskFormData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, taskData: Partial<TaskFormData & { completed: boolean }>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};