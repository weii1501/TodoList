import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

function Todo({todos, completeTodo, removeTodo, updateTodo, moveTodo}) {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id:null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
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
        />
    ))           
        

}

export default Todo
