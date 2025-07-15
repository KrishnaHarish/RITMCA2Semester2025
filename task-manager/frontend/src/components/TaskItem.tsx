import React, { useState } from 'react';
import { Task } from '../types';
import { taskService } from '../services/task';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await taskService.updateTask(task._id, { completed: !task.completed });
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true);
      try {
        await taskService.deleteTask(task._id);
        onTaskDeleted();
      } catch (err) {
        console.error('Failed to delete task:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await taskService.updateTask(task._id, editData);
      setIsEditing(false);
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#888';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-status">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isLoading}
            />
            <span 
              className="priority-indicator"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            ></span>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="edit-input"
              maxLength={100}
            />
          ) : (
            <h3 className="task-title">{task.title}</h3>
          )}
        </div>
        
        {isEditing ? (
          <div className="edit-form">
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              className="edit-textarea"
              rows={3}
              maxLength={500}
            />
            <div className="edit-row">
              <select
                name="priority"
                value={editData.priority}
                onChange={handleChange}
                className="edit-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                name="dueDate"
                value={editData.dueDate}
                onChange={handleChange}
                className="edit-input"
              />
            </div>
            <div className="edit-actions">
              <button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="task-details">
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-priority">Priority: {task.priority}</span>
              {task.dueDate && (
                <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
              )}
              <span className="task-created">Created: {formatDate(task.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
      
      {!isEditing && (
        <div className="task-actions">
          <button onClick={handleEdit} disabled={isLoading}>
            Edit
          </button>
          <button onClick={handleDelete} disabled={isLoading} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;