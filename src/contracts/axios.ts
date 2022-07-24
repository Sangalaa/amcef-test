export interface TodoList {
    id: string;
    title: string;
    createdAt: string
}

export interface TodoItem {
    id: string;
    listId: string
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
export type PostTodoListItemResponse = TodoList