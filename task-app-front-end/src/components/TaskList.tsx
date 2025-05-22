'use client';

import { useState } from 'react';
import { Task } from '@/app/dashboard/page';
import TaskForm from './TaskForm';

type TaskListProps = {
  tasks: Task[];
  onUpdateTask: (taskId: string, taskData: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Helper to format date in a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the CSS class for status badge
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'bg-yellow-100 text-yellow-800';
      case 'InProgress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get the CSS class for priority badge
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle quick status update
  const handleStatusChange = (taskId: string, newStatus: 'Todo' | 'InProgress' | 'Done') => {
    onUpdateTask(taskId, { status: newStatus });
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="py-4">
            {editingTaskId === task.id ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <TaskForm 
                  task={task} 
                  onSubmit={(taskData) => {
                    onUpdateTask(task.id, taskData);
                    setEditingTaskId(null);
                  }}
                  onCancel={() => setEditingTaskId(null)}
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={task.status === 'Done'}
                        onChange={() => {
                          handleStatusChange(
                            task.id, 
                            task.status === 'Done' ? 'Todo' : 'Done'
                          );
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-lg font-medium ${task.status === 'Done' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Due: {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-7 sm:ml-0">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleStatusChange(task.id, 'Todo')}
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        task.status === 'Todo'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                      }`}
                    >
                      Todo
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'InProgress')}
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        task.status === 'InProgress'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'Done')}
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        task.status === 'Done'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                    >
                      Done
                    </button>
                  </div>
                  <button
                    onClick={() => setEditingTaskId(task.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this task?')) {
                        onDeleteTask(task.id);
                      }
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
