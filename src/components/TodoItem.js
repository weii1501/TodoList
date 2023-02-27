import React, { useRef } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { useDrag, useDrop } from "react-dnd";

const type = 'item'

function TodoItem({todo, onSubmitUpdate, onRemoveTodo, onSetEdit, onCompleteTodo, index, moveTodo}) {

    const ref = useRef(null)

    const [{handleId}, drop] = useDrop({
        accept: type,
        collect(monitor) {
            return{
                handleId: monitor.getHandlerId()
            }
        },
        hover(item, monitor){
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveTodo(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: type,
        item: { id: todo.id, index },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })

    drag(drop(ref))

    return (
        <li 
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
            ref={ref} 
            style={{
                background: todo.bg,
            }}
        >
            <div 
                key={todo.id}
                onClick={() => onCompleteTodo(todo.id)}
            >
                {todo.text}
            </div>

            <div className='icons'>
                <RiCloseCircleLine 
                    onClick={() => onRemoveTodo(todo.id)}
                    className='delete-icon'
                />
                <TiEdit 
                    onClick={() => onSetEdit({id: todo.id, value: todo.text})}
                    className='edit-icon'
                />
            </div>
        </li>
    )
}

export default TodoItem
