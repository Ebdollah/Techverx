import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
  return (
    <div>
        <h1>Todos</h1>
        <ul>
        {todos.map((todo)=>{
            return (
                <li key={todo.id}>
                {todo.text}
                <button className='text-white bg-red-500 border-0 py-1 px-4 text-md rounded-md' onClick={()=>dispatch(removeTodo(todo.id))}>X</button>
                </li>
            )
        })}
        </ul>
       
    </div>
  )
}

export default Todos