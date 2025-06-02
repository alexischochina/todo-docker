import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
      <h1>Ma ToDo Liste</h1>
      <TodoList />
    </div>
  );
}

export default App;
