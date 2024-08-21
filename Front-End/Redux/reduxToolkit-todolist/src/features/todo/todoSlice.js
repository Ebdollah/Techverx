import { createSlice, nanoid } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    todos:[
        {id : 1, text : 'Hello World'}
    ]
}

export const todoSlide = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (state, action)=>{
            const todo = {
                id : nanoid(),
                text : action.payload,
            }
            state.todos.push(todo);
        },
        removeTodo : (state, action)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        }
    }
})

export const {addTodo, removeTodo} = todoSlide.actions;
export default todoSlide.reducer;