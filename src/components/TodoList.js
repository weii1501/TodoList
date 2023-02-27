import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from "immutability-helper";

function Todolist() {
    const itemColor = [
        'linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 12, 241, 1) 0%, rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg,rgba(20, 159, 255, 1) 0%,rgba(17, 122, 255, 1) 100%)'
    ]

    const [todos, setTodos] = useState([
        // {
        //     id:'1231',
        //     text:'aaaaa',
        //     bg: itemColor[0],
        // },
        // {
        //     id:'6456',
        //     text:'bbbbbbb',
        //     bg: itemColor[1],
        // },
        // {
        //     id:'6756',
        //     text:'ccccccc',
        //     bg: itemColor[2],
        // }
    ])

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
            if (todo.id ===id) {
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
                <ul className="characters" >
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
