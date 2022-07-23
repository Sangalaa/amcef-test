import { createSlice } from "@reduxjs/toolkit";
import { TodoItem, TodoList } from "../contracts/axios";

interface TodoListState {
    lists: TodoList[];
    items: TodoItem[];
}

const sortTodoItems = (a: TodoItem, b: TodoItem) => {
    const aDate = Date.parse(a.deadline)
    const bDate = Date.parse(b.deadline)

    if (a.done === b.done) {
        return aDate - bDate
    }
    
    return a.done === false ? -1 : 1
}

const todoListSlice = createSlice({
    name: "todoList",
    initialState: { lists: [], items: [] } as TodoListState,
    reducers: {
        setTodoLists(state, action) {
            state.lists = action.payload;
        },
        addTodoList(state, action) {
            state.lists.unshift(action.payload);
        },
        setTodoItems(state, action) {
            state.items = action.payload;
            state.items.sort(sortTodoItems);
        },
        addTodoItem(state, action) {
            state.items.push(action.payload);
            state.items.sort(sortTodoItems);
        },
        updateTodoItemStatus(state, action) {
            const todoItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (todoItem) {
                todoItem.done = action.payload.done;
                state.items.sort(sortTodoItems);
            }
        },
        removeTodoItem(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const todoListActions = todoListSlice.actions;

export default todoListSlice;
