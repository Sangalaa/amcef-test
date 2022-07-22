import { createSlice } from "@reduxjs/toolkit";
import { TodoList } from "../contracts/axios";

interface TodoListState {
    lists: TodoList[];
}

const todoListSlice = createSlice({
    name: "todoList",
    initialState: { lists: [] } as TodoListState,
    reducers: {
        setTodoLists(state, action) {
            state.lists = action.payload
        },
        addTodoList(state, action) {
            state.lists.push(action.payload)
        }
    },
});

export const todoListActions = todoListSlice.actions;

export default todoListSlice;
