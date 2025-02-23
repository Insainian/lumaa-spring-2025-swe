import React, { useState, useEffect } from 'react';
import api from '../api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title: newTaskTitle, description: newTaskDesc });
      setNewTaskTitle('');
      setNewTaskDesc('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to delete task');
    }
  };

  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    try {
      // Toggle the isComplete status
      await api.put(`/tasks/${id}`, { isComplete: !currentStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to update task status');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleCreateTask} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 border rounded"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            rows={3}
            placeholder="Task description"
            className="w-full p-2 border rounded"
            value={newTaskDesc}
            onChange={e => setNewTaskDesc(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 w-full"
        >
          Add Task
        </button>
      </form>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between border p-4 rounded">
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm mt-1">
                Status:{' '}
                <span className={task.isComplete ? 'text-green-600' : 'text-red-600'}>
                  {task.isComplete ? 'Complete' : 'Incomplete'}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleComplete(task.id, task.isComplete)}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;


