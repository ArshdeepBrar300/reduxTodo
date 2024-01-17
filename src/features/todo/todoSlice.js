import { createSlice,nanoid } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
const storageTodo=localStorage.getItem('todoLists')!==null ? JSON.parse(localStorage.getItem('todoLists')):[]
const initialState={
    todos:storageTodo
}


export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            console.log("run")
         
            const todo={
                id:nanoid(),
                text:action.payload.text,
                status:action.payload.status,
                date:action.payload.date

            }
           
            
            state.todos.push(todo) 
            localStorage.setItem('todoLists', JSON.stringify(state.todos.map(item=>item)))
           
        },
        removeTodo: (state, action) => {
            console.log(action.payload)
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id )
            localStorage.setItem('todoLists', JSON.stringify(state.todos.map(item=>item)))
        },
        updateTodo:(state,action)=>{
            const updatedTodo= state.todos.map((todo)=>{
                return todo.id===action.payload.id?{...todo,text:action.payload.text}:todo
            })
            localStorage.setItem('todoLists', JSON.stringify(state.todos.map(item=>item)))
            return updatedTodo
        },
        swapTodos:(state,action)=>{
            const {sourceIndex,targetIndex}=action.payload;
            const updatedTodos=[...state.todos]
            const [movedTodo]=updatedTodos.splice(sourceIndex,1);
            updatedTodos.splice(targetIndex,0,movedTodo);
            state.todos=updatedTodos;
            localStorage.setItem('todoLists', JSON.stringify(state.todos.map(item=>item)))


        },
        changeStatus:(state,action)=>{
            console.log('status change');
            
            state.todos= state.todos.map((todo)=>{
                return todo.id===action.payload.id?{...todo,status:action.payload.status}:todo
            })
           
            localStorage.setItem('todoLists', JSON.stringify(state.todos.map(item=>item)))
            console.log(state.todos);

        }
    }
})

export const {addTodo,removeTodo,updateTodo,changeStatus,swapTodos}=todoSlice.actions

export default todoSlice.reducer