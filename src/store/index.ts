import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./todoList-slice";

const store = configureStore({
    reducer: {
        todoList: todoListSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store