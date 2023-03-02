import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper';
import axios from 'axios'

function Todolist() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://192.168.0.135:8080/api/')
            .then(res => {
                // console.log(res.data)
                setTodos(res.data)
            })
            .catch(err => {
                console.log(err => console.log(err))
            })
    }, [])

    const addTodo = todo => {
        if (!todo.content || /^\s*$/.test(todo.content)) {
            return
        }
        const data = {
            content: todo.content,
            order: todo.order,
            color_bg: todo.color_bg,
            is_completed: todo.is_completed
        }
        axios.post('http://192.168.0.135:8080/api/', data)
            .then(res => {
                // console.log(res.data)
                const newTodos = [...todos, todo ]
                setTodos(newTodos)
            })
            .catch(err => console.log(err))
        
    }

    const setTodosPr = e => setTodos(e)

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.is_completed = !todo.is_completed
            }
            return todo
        })

        setTodos(updatedTodos)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.content || /^\s*$/.test(newValue.content)) {
            return
        }
        
        setTodos(prev => prev.map(item => item.id === todoId ? newValue : item))
    }

    const removeTodo = id => {
        console.log(id)
        axios.delete(`http://192.168.0.135:8080/api/${id}/`)
            .then(res => {
                // console.log('data:' ,res.data)
                // console.log('todos', todos)
                const removeArr = [...todos].filter(todo => todo.id !== id)
                setTodos(removeArr)
            })
            .catch(err => console.log(err))
    }

    const moveTodo = (dragIndex, hoverIndex) => {
        const draggedTodo = todos[dragIndex]
        setTodos(
            update(todos, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, draggedTodo]]
            })
        )
    }

    const orderTodo = () => {
        const newArr = todos.map((todo, index) => {
            todo.order = index
            return todo
        })
        console.log(todos)
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm 
                onSubmit={addTodo}
                todos={todos}
                orderTodos={orderTodo}
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
                        orderTodo={orderTodo}
                    />
                </ul>
            </DndProvider>
        </div>
    )
}

export default Todolist
