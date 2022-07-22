export interface TodoList {
    id: string;
    title: string;
}

export interface TodoItem {
    id: string;
    itemId: string
    title: string;
    description: string;
    done: boolean
    deadline: string
    createdAt: string
    updatedAt: string
}

export type GetTodoListsResponse = TodoList[]
export type GetTodoItemsResponse = TodoItem[]

export type PostTodoListResponse = TodoList