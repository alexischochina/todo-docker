import React, { useState } from 'react';
import { FaTrash, FaCheck, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './TodoItem.scss';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle(todo);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { ...todo, title: editTitle.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="todo-content">
        <button 
          className={`check-button ${todo.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          disabled={isLoading || isEditing}
        >
          {todo.completed && <FaCheck />}
        </button>
        
        {isEditing ? (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            disabled={isLoading}
          />
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={!editTitle.trim() || isLoading}
            >
              <FaSave />
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
              disabled={isLoading || todo.completed}
            >
              <FaEdit />
            </button>
            <button 
              className="delete-button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem; 