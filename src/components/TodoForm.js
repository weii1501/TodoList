import React, { useState, useEffect, useRef } from 'react'


function TodoForm(props) {
    const itemColor = [
        'linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 12, 241, 1) 0%, rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg, rgba(98,128,198) 0%, rgba(17, 122, 255, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 118, 20, 1) 0%, rgba(255, 84, 17, 1) 100%)'
    ]

    //console.log(props.todos)

    const [input, setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value)
    }


    const handleSubmit = e => {
        e.preventDefault()
        const num = props.todos.length % 4
        const color = itemColor[num]
        const order = props.todos.length
        props.onSubmit({
            id: Math.floor(Math.random()*10000).toString(),
            text: input,
            bg: color,
            order: order
        })
        setInput('')
    }

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            {
                props.edit ? (
                    <>
                        <input 
                            className='todo-input edit'
                            type='text' 
                            placeholder='Add a todo' 
                            value={input}
                            name='text'
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className='todo-button edit'>
                            Update
                        </button>
                    </>
                ) : (
                    <>
                        <input 
                            className='todo-input'
                            type='text' 
                            placeholder='Add a todo' 
                            value={input}
                            name='todo-input'
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className='todo-button'>
                            Add todo
                        </button>
                    </>
                )
            }
        </form>
    )
}

export default TodoForm
