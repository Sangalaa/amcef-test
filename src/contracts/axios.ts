export interface TodoList {
    id: number;
    title: string;
}

export interface TodoItem {
    id: number;
    itemId: number
    title: string;
    done: boolean
    deadline: string
    createdAt: string
    updatedAt: string
}

export type GetTodoListsResponse = TodoList[]
export type GetTodoItemsResponse = TodoItem[]

export type PostTodoListResponse = TodoList