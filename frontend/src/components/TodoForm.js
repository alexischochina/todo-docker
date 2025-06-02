import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './TodoForm.scss';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAddTodo(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Que voulez-vous accomplir aujourd'hui ?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={!title.trim() || isSubmitting}
        >
          <FaPlus />
          {isSubmitting ? 'Ajout...' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm; 