import React from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaPercent } from 'react-icons/fa';
import './TodoStats.scss';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const stats = [
    {
      label: 'Total',
      value: totalTodos,
      icon: FaTasks,
      color: 'primary'
    },
    {
      label: 'Terminées',
      value: completedTodos,
      icon: FaCheckCircle,
      color: 'success'
    },
    {
      label: 'En cours',
      value: pendingTodos,
      icon: FaClock,
      color: 'warning'
    },
    {
      label: 'Progression',
      value: `${completionPercentage}%`,
      icon: FaPercent,
      color: 'info'
    }
  ];

  return (
    <div className="todo-stats">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">
            <stat.icon />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoStats; 