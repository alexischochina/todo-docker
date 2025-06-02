import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/todos';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // Récupérer la liste des todos au montage
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      await axios.post(API_URL, { title: newTitle });
      setNewTitle('');
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem' }}
          type="text"
          placeholder="Nouvelle tâche..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addTodo} style={{ marginLeft: '0.5rem' }}>Ajouter</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo)}
            />
            <span
              style={{
                flex: 1,
                marginLeft: '0.5rem',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '0.5rem' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
