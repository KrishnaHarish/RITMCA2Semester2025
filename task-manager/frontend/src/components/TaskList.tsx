import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { taskService } from '../services/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useAuth } from '../contexts/AuthContext';

const TaskList: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
      setError('');
    } catch (err: any) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowForm(false);
    loadTasks();
  };

  const handleTaskUpdated = () => {
    loadTasks();
  };

  const handleTaskDeleted = () => {
    loadTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-list-container">
      <header className="app-header">
        <h1>Personal Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="task-controls">
        <button 
          onClick={() => setShowForm(true)} 
          className="add-task-btn"
          disabled={showForm}
        >
          + Add New Task
        </button>
        
        <div className="task-filters">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}
          >
            All ({tasks.length})
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={filter === 'pending' ? 'active' : ''}
          >
            Pending ({pendingCount})
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TaskForm 
          onTaskCreated={handleTaskCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            {filter === 'all' ? 'No tasks yet. Create your first task!' : 
             filter === 'pending' ? 'No pending tasks.' : 'No completed tasks.'}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;