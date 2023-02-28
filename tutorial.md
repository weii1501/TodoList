# `Hướng dẫn Todolist`
## Giới thiệu 
Khi tôi bắt đầu làm quen với Reactjs, tôi đã tạo ra một web đơn giản bằng công nghệ này. Trong project này tôi sử dụng các thư viện của React, cụ thể: react-icons, react-dnd, react-dnd-html5-backend, immutability-helper.
## Tạo project
Trong ví dụ này, chúng ta sẽ làm một ứng dụng Todolist đơn giản gồm các chức năng thêm, xóa, sửa, sắp xếp công việc. Chúng ta tạo projetc mới với *yarn*
```console
yarn create react-app todolist
cd todolist
code .
```
Sau đó chúng ta thêm các thư viện mà chúng ta sử dụng trong ví dụ này
```console
yarn add react-icons react-dnd react-dnd-html5-backend immutability-helper
```
Hoàn thành những bước trên ta sẽ có được cây thư mục như sau:
```
todolist
|_____node_modules
|_____public
|  |_____favicon.ico
|  |_____index.html
|  |_____logo192.png
|  |_____lodo512.png
|  |_____manifest.json
|  |_____robot.txt
|_____src
|  |_____App.css
|  |_____App.js
|  |_____App.test.js
|  |_____index.js
|  |_____reportWebVitals.js
|  |_____setupTests.js
|_____package.json
|_____yarn.lock

```
## Tạo các component
Chúng ta bắt đầu tạo components gồm các file, cụ thể: *Todolist.js, TodoForm.js, Todo.js, TodoItem.js*. Tất cả các file này được đặt trong một thư mục *component*: 
```
todolist
|_____node_modules
|_____public
|  |_____favicon.ico
|  |_____index.html
|  |_____logo192.png
|  |_____lodo512.png
|  |_____manifest.json
|  |_____robot.txt
|_____components
|  |_____Todo.js
|  |_____TodoForm.js
|  |_____TodoItem.js
|  |_____TodoList.js
|_____src
|  |_____App.css
|  |_____App.js
|  |_____App.test.js
|  |_____index.js
|  |_____reportWebVitals.js
|  |_____setupTests.js
|_____package.json
|_____yarn.lock

```
Ở file `./src/components/TodoList.js`. Ta chọn nó là component cha của *Todoform*:
```javascript
import React from 'react'
import TodoForm from './TodoForm'

function Todolist() {
    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm />
        </div>
    )
}

export default TodoList
```
Tiếp theo, file `./src/components/TodoForm.js` ta sẽ tạo form để có thể nhập liệu vào TodoList của chúng ta:
```js
import React, { useState } from 'react'

function TodoForm() {
    const [input, setInput] = useState('')

    const handleChange = e => {
        setInput(e.target.value)
    }


    return(
        <form className='todo-form'>
            <input 
                className='todo-input'
                type='text' 
                placeholder='Add a todo' 
                value={input}
                name='todo-input'
                onChange={handleChange}
            />
            <button className='todo-button'>
                Add todo
            </button>
        </form>
    )
}

export default TodoForm
```
Bây giờ chúng ta sẽ bắt đầu với việc nhập dữ liệu. Quay lại file `./src/components/TodoList.js`, chúng ta sẽ tạo ra một mảng các object là todos chứa các thông tin như: *id, text, bg (background)*. Chúng ta sẽ sử dụng `useState` để có thể thêm dữ liệu cho mảng todos
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'

function Todolist() {
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm 
                onSubmit={addTodo}
                todos={todos}
            />
        </div>
    )
}
export default TodoList
```
Ở đây chúng ta có lệnh `if` trong hàm `addTodo` để kiểm tra xem trong `input` có rỗng hay không, có chứa các kí tự đặc biệt không. Nếu có thì không làm gì cả. Sau đó ta truyền 2 `props` là `todos` và `addTodo` để có thể thực hiện việc nhập trong component `TodoForm`.

Tại `./src/components/TodoForm.js`, ta viết như sau:
```js
import React, { useState } from 'react'

function TodoForm() {
    const itemColor = [
        'linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 12, 241, 1) 0%, rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg, rgba(98,128,198) 0%, rgba(17, 122, 255, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 118, 20, 1) 0%, rgba(255, 84, 17, 1) 100%)'
    ]

    const [input, setInput] = useState('')

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const num = props.todos ? (props.todos.length % 4) : (Math.floor(Math.random()*4))
        const color = itemColor[num]
        props.onSubmit({
            id: Math.floor(Math.random()*10000).toString(),
            text: input,
            bg: color,
        })
        setInput('')
    }

    return(
        <form className='todo-form' onSubmit={handleSubmit}>
            <input 
                className='todo-input'
                type='text' 
                placeholder='Add a todo' 
                value={input}
                name='todo-input'
                onChange={handleChange}
            />
            <button className='todo-button'>
                Add todo
            </button>
        </form>
    )
}

export default TodoForm
```
Biến `num` ở đây tôi dùng để set màu theo thứ tự, một phần để thuận mắt người nhìn hoặc đó là ý kiến của ông bạn tôi. :vv

Hoàn thành bước nhập dữ liệu, bây giờ ta nghĩ đến cách display chúng. Quay về `./src/components/TodoList.js`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function Todolist() {
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }

    return (
        <div>
                <h1>What's the Plan for Today?</h1>
                    <TodoForm 
                        onSubmit={addTodo}
                        todos={todos}
                    /> 
                    <ul className="container" >
                        <Todo
                            todos={todos}
                        />
                    </ul>
            </div>
    )
}

export default TodoList
```
Ở dây. ta truyền props `todos` để có thể display mảng này trong component `Todo`. file `./src/components/Todo.js`:
```js
import React from 'react'
import TodoItem from './TodoItem'

function Todo({todos}) {

    return todos.map((todo, index) => (
        <TodoItem
            todo={todo}
            key={index}
            index={index}
        />
    ))     
}

export default Todo
```
Ta qua component `TodoItem` để có thể trình bày được các nội dung trong này. việc mình chia nhỏ thế này để mình có thể dễ quản lí cũng như làm được những công việc khác.

file `./src/components/TodoItem.js`:
```js
import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function TodoItem({todo}) {
    return (
        <li 
            className='todo-row'
            style={{
                background: todo.bg,
            }}
        >
            <div 
                key={todo.id}
            >
                {todo.text}
            </div>

            <div className='icons'>
                <RiCloseCircleLine 
                    className='delete-icon'
                />
                <TiEdit 
                    className='edit-icon'
                />
            </div>
        </li>
    )
} 

export default TodoItem
```
Chức năng thêm chúng ta đã hoàn thành. Bây giờ chúng ta sẽ thực hiện việc xóa một công việc nào đó. t file `./src/components/TodoList.js`, tại file này chúng ta sẽ viết hàm `removeTodo` dựa trên `id`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function Todolist() {
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    return (
        <div>
                <h1>What's the Plan for Today?</h1>
                    <TodoForm 
                        onSubmit={addTodo}
                        todos={todos}
                    /> 
                    <ul className="container" >
                        <Todo
                            todos={todos}
                            removeTodo={removeTodo}
                        />
                    </ul>
            </div>
    )
}

export default TodoList
```
file `./src/components/Todo.js`:
```js
import React from 'react'
import TodoItem from './TodoItem'

function Todo({todos. removeTodo}) {

    return todos.map((todo, index) => (
        <TodoItem
            todo={todo}
            key={index}
            index={index}
            onRemoveTodo={removeTodo}  
        />
    ))     
}

export default Todo
```
file `./src/components/TodoItem.js`:
```js
import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function TodoItem({todo}) {
    return (
        <li 
            className='todo-row'
            style={{
                background: todo.bg,
            }}
        >
            <div 
                key={todo.id}
            >
                {todo.text}
            </div>

            <div className='icons'>
                <RiCloseCircleLine 
                    className='delete-icon'
                    onClick={() => onRemoveTodo(todo.id)}
                />
                <TiEdit 
                    className='edit-icon'
                />
            </div>
        </li>
    )
} 

export default TodoItem
```
Chức năng `removeTodo` khá đơn giản, nhưng việc sửa nội dung công việc sẽ có một chút khó khăn

Ta sẵ bắt tay vào làm chức năng *sửa* nội dung công việc. file `./src/components/TodoList.js`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function Todolist() {
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
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

    return (
        <div>
                <h1>What's the Plan for Today?</h1>
                    <TodoForm 
                        onSubmit={addTodo}
                        todos={todos}
                    /> 
                    <ul className="container" >
                        <Todo
                            todos={todos}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    </ul>
            </div>
    )
}

export default TodoList
```
Ở hàm `updateTodo` nó thực hiện công việc như sau: input là `id` cần đổi và dữ liệu mới, ta dùng `map` để duyệt qua các phần tử, khi `id` của `item` trùng với input đưa vào thì thực hiện việc sửa đổi. việc truyền *prop* cũng tương tự như các chức năng ở trên.

file `./src/components/Todo.js`: 
```js
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
            key={index}
            index={index}
        />
    ))           
        

}

export default Todo
```
file `./src/components/TodoItem.js`: 
```js
import React, { useRef } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function TodoItem({todo, onSubmitUpdate, onRemoveTodo, onSetEdit, index}) {

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
```
Vì khi bấm vào icon `edit` thì form sẽ thay đổi. ta phải điều chỉnh thêm ở file `./src/components/TodoForm.js`:
```js
import React, { useState, useEffect, useRef } from 'react'


function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const itemColor = [
        'linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 12, 241, 1) 0%, rgba(250, 0, 135, 1) 100%)',
        'linear-gradient(90deg, rgba(98,128,198) 0%, rgba(17, 122, 255, 1) 100%)',
        'linear-gradient(90deg, rgba(255, 118, 20, 1) 0%, rgba(255, 84, 17, 1) 100%)'
    ]

    //console.log(props.todos)

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value)
    }


    const handleSubmit = e => {
        e.preventDefault()
        const num = props.todos ? (props.todos.length % 4) : (Math.floor(Math.random()*4))
        const color = itemColor[num]
        props.onSubmit({
            id: Math.floor(Math.random()*10000).toString(),
            text: input,
            bg: color,
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
```
Ở đây các bạn có thể tùy chỉnh theo ý các bạn nhé!!

Bây giờ ta tới công đoạn đánh dấu công việc đã hoàn thành trong Todolist của chúng ta. Ý tưởng của công đoạn này mình sẽ tạo một đường gạch giữa của *text* và là mờ *background*.

file `./src/components/TodoList.js`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function Todolist() {
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }

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

    return (
        <div>
                <h1>What's the Plan for Today?</h1>
                    <TodoForm 
                        onSubmit={addTodo}
                        todos={todos}
                    /> 
                    <ul className="container" >
                        <Todo
                            todos={todos}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    </ul>
            </div>
    )
}

export default TodoList
```
Hàm `completeTodo` sẽ duyệt qua từng phần tử, nếu `id` mà input truyền vào bằng `todo.id` thì sẽ thực hiện cập nhật trạng thái hoàn thành `isComplete = true`

file `./src/components/TodoList.js`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

function Todo({todos, completeTodo, removeTodo, updateTodo}) {

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
        />
    ))           
        

}

export default Todo
```
file `./src/components/TodoItem.js`:
```js
import React, { useRef } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function TodoItem({todo, onSubmitUpdate, onRemoveTodo, onSetEdit, index}) {

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
```

Như vậy chúng ta đã hoàn thành các chức năng cơ bản của TodoList. nhưng bây giờ sẽ đến thao tác phức tạp hơn đó là sắp xếp các công việc mình đã thêm bằng cách kéo thả các *item*. Để thực hiện thao tác này, chúng ta sẽ sử dung thư viện `react-dnd`, `react-dnd-html5-backend`, và `immutability-helper`. Thao tác này mất khá nhiều thời gian tìm hiểu của tôi.
Trước khi vào code phần này chúng ta cần tìm hiểu cách làm việc của *React DnD*:
- *React DnD* cần có các references của tất cả các item cần drop(thả).
- *React DnD* cần có các references của tất cả các item cần drag(kéo).

Tất cả các elements cần thực hiện kéo thả phải được đặt trong React DnD’s context provider, nó sẽ khởi tao cũng như quản lí các state bên trong.

file `./src/components/TodoList.js`:
```js
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

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
                    />
                </ul>
            </DndProvider>
        </div>
    )
}

export default Todolist
```
Chúng ta import `DndProvider` với props là `backend`. Đây là biến giúp chúng ta thực hiện thao tác kéo và thả. `HTML5 Drag and Drop API` chỉ hỗ trợ cho phiên bản web. Sau đó, component `Todo` dẽ được bọc bởi `DndProvider` để tạo nên cùng kéo cho các items.

file `./src/components/TodoItem.js`:
```js
import React, { useRef } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { useDrag, useDrop } from "react-dnd";

// Biến này dùng để phân loại phần tử được kéo thả vào
const type = 'item'

function TodoItem({todo, onSubmitUpdate, onRemoveTodo, onSetEdit, onCompleteTodo, index, moveTodo}) {

    const ref = useRef(null) // khởi tạo reference

    //useDrop hook chịu trách nhiệm xử lý xem có mục nào được hover hoặc drop trên phần tử hay không 
    const [{handleId}, drop] = useDrop({
        // Chấp nhận sẽ đảm bảo chỉ những loại phần tử này mới có thể bỏ được trên phần tử này
        accept: type,
        // phương pháp thu thập dữ liệu bổ sung để xử lý thả cũng như item hiện đang được thả
        collect(monitor) {
            return{
                handleId: monitor.getHandlerId()
            }
        },
        // Phương thức này được gọi khi chúng ta di chuột qua một phần tử trong khi kéo
        hover(item, monitor){ // item là element được kéo
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Không tự thay thế
            if (dragIndex === hoverIndex) {
                return
            }
            // Xác đinh rectangle trên màn hình
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Nhận dọc giữa
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Xác định vị trí con trỏ
            const clientOffset = monitor.getClientOffset()
            // Đứa pixel lên đầu
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Chỉ thực hiện di chuyển khi chuột đã vượt qua một nửa chiều cao của item
            // Khi kéo xuống dưới, chỉ di chuyển khi con trỏ ở dưới 50%
            // Khi kéo lên trên, chỉ di chuyển khi con trỏ trên 50%
            // Kéo xuống dưới
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Kéo lên trên
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Thời gian thực hiện hành động
            moveTodo(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    // useDrag sẽ chịu trách nhiệm làm cho phần tử có thể kéo được. Nó cũng hiển thị phương thức isDragging để thêm bất kỳ styles nào trong khi kéo
    const [{isDragging}, drag] = useDrag({
        // Chấp nhận sẽ đảm bảo chỉ những loại phần tử này mới có thể bỏ được trên phần tử này
        type: type,
        // dữ liệu của mục có sẵn cho các phương pháp thả
        item: { id: todo.id, index },
        // phương pháp thu thập dữ liệu bổ sung để xử lý thả cũng như item hiện đang được kéo
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })

    /*
        Khởi tạo thao tác kéo và thả vào phần tử bằng cách sử dụng reference của nó.
        Ở đây chúng ta khởi tạo drop và drag của các element tương tự. (i.e., TodoItem component)
    */

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
```
Tôi đã trình bày cụ thể và ý nghĩa từng dòng code nên các bạn cố gắng đọc và hình dung cách là khi di chuyển, và sắp xếp lại các phần tử của mảng `todos` nhé. Ở đây vẫn còn một hàm chưa viết đó là `moveTodo` dùng để thực hiện việc di chuyển của các item.

file `./src/components/TodoList.js`:
```js
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
```

file `./src/components/Todo.js`:
```js
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
```

file `./src/components/TodoItem.js`:
```js
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
```

## Kết luận
Như vậy tôi đã trình bày cho các bạn cách làm một `TodoList` đơn giản. Mình cũng mới làm việc với Reactjs nên có nhiều thiếu xót mong các bạn sẽ góp ý cho mình về bài viết cũng như những kinh nghiệm làm việc với công nghệ này nhé. Tạm biệt và chúc các bạn thành công!

Github: https://github.com/weii1501/TodoList.git
