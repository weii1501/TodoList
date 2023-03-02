import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

function Todo({todos, completeTodo, removeTodo, updateTodo, moveTodo, orderTodo}) {

    const [edit, setEdit] = useState({
        id: null,
        value: '',
        order: undefined,
        color_bg: undefined
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value, edit.order)
        setEdit({
            id:null,
            value: '',
            order: undefined,
            color_bg: undefined
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} todos={todos}/>
    }


    return todos.map((todo, index) => (
        <TodoItem
            todo={todo}
            onSubmitUpdate={submitUpdate}
            onRemoveTodo={removeTodo}
            onSetEdit={setEdit}
            onCompleteTodo={completeTodo}
            key={index}
            index={index}
            moveTodo={moveTodo}
            onOrderTodo={orderTodo}
        />
    ))           
        

}

export default Todo
