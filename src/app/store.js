import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/todoSlice'



export const store=configureStore({reducer:todoReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),})