import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import Todolist from './components/TodoList';
import './App.css'

function App() {
  
  return (
    <div className="todo-app">
      <Todolist/>
    </div>
  );
}

export default App;
