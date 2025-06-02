import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './TodoList.scss';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/todos';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les tâches. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      await axios.post(API_URL, { title });
      await fetchTodos();
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      throw new Error('Impossible d\'ajouter la tâche');
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      await fetchTodos();
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      throw new Error('Impossible de modifier la tâche');
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      await fetchTodos();
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      throw new Error('Impossible de mettre à jour la tâche');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTodos();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      throw new Error('Impossible de supprimer la tâche');
    }
  };

  if (loading) {
    return (
      <div className="todo-loading">
        <FaSpinner className="spinner" />
        <p>Chargement des tâches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-error">
        <FaExclamationTriangle />
        <p>{error}</p>
        <button onClick={fetchTodos} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <TodoStats todos={todos} />
      <TodoForm onAddTodo={addTodo} />
      
      {todos.length === 0 ? (
        <div className="empty-state">
          <h3>Aucune tâche pour le moment</h3>
          <p>Ajoutez votre première tâche ci-dessus pour commencer !</p>
        </div>
      ) : (
        <div className="todos-container">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleCompleted}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
