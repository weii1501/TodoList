import React, { useState, useRef } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import TodoItem from './TodoItem'
import { Motion, spring } from 'react-motion'


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
        <Motion
            key={index}
            style={{ y: spring(todos.order * 80, { stiffness: 500, damping: 32 }) }}
        >
            {({y}) =>
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
            }
        </Motion>
    ))           
        

}

export default Todo
