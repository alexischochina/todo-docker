import React from 'react';
import TodoList from './components/TodoList';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>✨ Ma ToDo Liste</h1>
          <p>Organisez vos tâches avec style</p>
        </header>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
