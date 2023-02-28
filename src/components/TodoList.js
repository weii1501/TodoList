import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper';

function Todolist() {

    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }

    const setTodosPr = e => setTodos(e)

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })

        setTodos(updatedTodos)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        
        setTodos(prev => prev.map(item => item.id === todoId ? newValue : item))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    const moveTodo = (dragIndex, hoverIndex) => {
        const draggedTodo = todos[dragIndex]
        setTodos(
            update(todos, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedTodo]]
            })
        )
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm 
                onSubmit={addTodo}
                todos={todos}
            />
            <DndProvider backend={HTML5Backend}>
                <ul className="container" >
                    <Todo
                        todos={todos}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        setTodos={setTodosPr}
                        moveTodo={moveTodo}
                    />
                </ul>
            </DndProvider>
        </div>
    )
}

export default Todolist
