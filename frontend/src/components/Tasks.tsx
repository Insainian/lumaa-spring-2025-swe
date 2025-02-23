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
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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
      await api.put(`/tasks/${id}`, { isComplete: !currentStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to update task status');
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSaveEdit = async (id: number) => {
    try {
      await api.put(`/tasks/${id}`, { title: editTitle, description: editDescription });
      setEditingTaskId(null);
      setEditTitle('');
      setEditDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to update task');
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
          <input
            type="text"
            placeholder="Task description"
            className="w-full p-2 border rounded"
            value={newTaskDesc}
            onChange={e => setNewTaskDesc(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Task
        </button>
      </form>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => handleToggleComplete(task.id, task.isComplete)}
                className="mr-4"
              />
              {editingTaskId === task.id ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="mb-2 p-1 border rounded w-full"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    className="mb-2 p-1 border rounded w-full"
                  />
                  <div>
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm mt-1">
                    Status:{' '}
                    <span className={task.isComplete ? 'text-green-600' : 'text-red-600'}>
                      {task.isComplete ? 'Complete' : 'Incomplete'}
                    </span>
                  </p>
                </div>
              )}
            </div>
            {editingTaskId !== task.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 justify-end"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
