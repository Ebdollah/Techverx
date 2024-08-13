import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { addTodo } from "../features/todo/todoSlice";

function Addtodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const addTodoHandler = (e)=>{
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('')
    }

  return (
    <div>
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <input
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus: ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='text-white bg-red-500 border-0 py-1 px-4 text-md rounded-md'>Add Todo</button>
      </form>
    </div>
  );
}

export default Addtodo;
