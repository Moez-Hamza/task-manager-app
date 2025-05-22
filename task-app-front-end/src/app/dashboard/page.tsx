'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import FilterBar from '../../components/FilterBar';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/taskService';
import { ApiError } from '@/types/error';
import { Task, TaskCreateInput, TaskUpdateInput } from '@/types/task.types';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskData = await getTasks(session?.accessToken!, {
          status: statusFilter,
          priority: priorityFilter,
          sortBy,
          order: sortOrder
        });
        setTasks(taskData);
      } catch (err: ApiError | unknown) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [session, statusFilter, priorityFilter, sortBy, sortOrder]);

  const handleCreateTask = async (taskData: TaskCreateInput) => {
    if (!session?.accessToken) return;

    try {
      const newTask = await createTask(session.accessToken, taskData);
      
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setShowAddForm(false);
    } catch (err: ApiError | unknown) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: TaskUpdateInput) => {
    if (!session?.accessToken) return;

    try {
      const updatedTask = await updateTask(session.accessToken, taskId, taskData);
      
      setTasks((prevTasks) => 
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err: ApiError | unknown) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!session?.accessToken) return;

    try {
      await deleteTask(session.accessToken, taskId);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err: ApiError | unknown) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {showAddForm ? 'Cancel' : 'Add New Task'}
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md">
              {error}
            </div>
          )}

          {showAddForm && (
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-4 cursor-pointer" onClick={() => setShowAddForm(false)}>Create New Task</h2>
              <TaskForm onSubmit={handleCreateTask} />
            </div>
          )}

          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks.length > 0 ? (
            <TaskList 
              tasks={tasks} 
              onUpdateTask={handleUpdateTask} 
              onDeleteTask={handleDeleteTask} 
            />
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No tasks found. Create your first task!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
