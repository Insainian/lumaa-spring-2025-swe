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
    <div>
      <h2>My Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTaskDesc}
          onChange={e => setNewTaskDesc(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} {' '}
            {task.isComplete ? '[Complete]' : '[Incomplete]'}
            <button onClick={() => handleToggleComplete(task.id, task.isComplete)}>
              {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
