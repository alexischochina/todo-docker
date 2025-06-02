<template>
  <div id="app">
    <div class="container">
      <header>
        <h1>📝 Todo App</h1>
        <p>Votre gestionnaire de tâches personnel</p>
      </header>

      <div class="todo-form">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo"
          type="text" 
          placeholder="Ajouter une nouvelle tâche..."
          class="todo-input"
        />
        <button @click="addTodo" class="add-btn">Ajouter</button>
      </div>

      <div class="todo-stats">
        <span class="stat">Total: {{ todos.length }}</span>
        <span class="stat">Terminées: {{ completedCount }}</span>
        <span class="stat">En cours: {{ remainingCount }}</span>
      </div>

      <div class="todo-filters">
        <button 
          @click="filter = 'all'" 
          :class="{ active: filter === 'all' }"
          class="filter-btn"
        >
          Toutes
        </button>
        <button 
          @click="filter = 'active'" 
          :class="{ active: filter === 'active' }"
          class="filter-btn"
        >
          En cours
        </button>
        <button 
          @click="filter = 'completed'" 
          :class="{ active: filter === 'completed' }"
          class="filter-btn"
        >
          Terminées
        </button>
      </div>

      <div class="todo-list">
        <div 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input 
            type="checkbox" 
            v-model="todo.completed"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-btn">🗑️</button>
        </div>
      </div>

      <div v-if="todos.length === 0" class="empty-state">
        <p>🎉 Aucune tâche pour le moment!</p>
        <p>Ajoutez votre première tâche ci-dessus.</p>
      </div>

      <footer>
        <p>💻 Application Frontend Dockerisée | Nuxt.js 3</p>
        <p class="note">Note: Fonctionnement en mode local (pas de backend pour le moment)</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const newTodo = ref('')
const filter = ref('all')
const todos = ref([])

onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  } else {
    todos.value = [
      {
        id: 1,
        text: 'Configurer Docker pour le frontend',
        completed: true,
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        id: 2,
        text: 'Créer l\'interface utilisateur',
        completed: true,
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        id: 3,
        text: 'Intégrer avec le backend',
        completed: false,
        createdAt: new Date()
      }
    ]
    saveTodos()
  }
})

const completedCount = computed(() => todos.value.filter(todo => todo.completed).length)
const remainingCount = computed(() => todos.value.filter(todo => !todo.completed).length)

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    const todo = {
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false,
      createdAt: new Date()
    }
    todos.value.unshift(todo)
    newTodo.value = ''
    saveTodos()
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  saveTodos()
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

watch(todos, saveTodos, { deep: true })
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;
}

header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  font-weight: 300;
}

header p {
  opacity: 0.9;
  font-size: 1.1em;
}

.todo-form {
  padding: 30px;
  display: flex;
  gap: 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.todo-input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.todo-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
  padding: 15px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.todo-stats {
  padding: 20px 30px;
  background: #f8f9fa;
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #e9ecef;
}

.stat {
  font-weight: 600;
  color: #495057;
}

.todo-filters {
  padding: 20px 30px;
  display: flex;
  gap: 10px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.filter-btn {
  padding: 10px 20px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.todo-list {
  max-height: 400px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #f1f3f4;
  transition: all 0.3s ease;
}

.todo-item:hover {
  background: #f8f9fa;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-checkbox {
  margin-right: 15px;
  transform: scale(1.2);
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #495057;
}

.todo-date {
  font-size: 12px;
  color: #6c757d;
  margin-right: 15px;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #ffe6e6;
}

.empty-state {
  text-align: center;
  padding: 60px 30px;
  color: #6c757d;
}

.empty-state p {
  margin-bottom: 10px;
  font-size: 18px;
}

footer {
  background: #f8f9fa;
  padding: 30px;
  text-align: center;
  color: #6c757d;
  border-top: 1px solid #e9ecef;
}

footer p {
  margin-bottom: 5px;
}

.note {
  font-size: 14px;
  font-style: italic;
  color: #fd7e14;
}

@media (max-width: 768px) {
  .container {
    margin: 10px;
    border-radius: 15px;
  }
  
  .todo-form {
    flex-direction: column;
  }
  
  .todo-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .todo-filters {
    flex-wrap: wrap;
  }
  
  .todo-item {
    padding: 15px 20px;
  }
}
</style>
