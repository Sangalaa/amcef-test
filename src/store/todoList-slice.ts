import { createSlice } from "@reduxjs/toolkit";

export interface TodoList {
    id: number;
    title: string;
}

interface TodoListState {
    lists: TodoList[];
}

const todoListSlice = createSlice({
    name: "todoList",
    initialState: { lists: [] } as TodoListState,
    reducers: {
        setTodoLists(state, action) {
            state.lists = action.payload
        }
    },
});

export const todoListActions = todoListSlice.actions;

export default todoListSlice;
