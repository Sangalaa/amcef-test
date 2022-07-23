import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TodoItem } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { todoListActions } from "../store/todoList-slice";
import FilterChip from "./filterChip";
import SearchTextField from "./searchTextField";

type SearchParams = {
    search?: string;
    done?: string;
    sortBy: string;
    order: string;
};

interface TodoItemSearchProps {
    todoListId: string;
}

const TodoItemSearch: React.FC<TodoItemSearchProps> = ({ todoListId }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        sortBy: "deadline",
        order: "asc",
    });
    const { axiosFetch } = useAxios<TodoItem[]>();

    const dispatch = useDispatch();

    useEffect(() => {
        if(searchParams.search === undefined) return
        
        axiosFetch(`items/${todoListId}/lists`, "GET", {}, searchParams).then(
            (todoItems) => dispatch(todoListActions.setTodoItems(todoItems))
        );
    }, [searchParams]);

    const handleFilterChip = (name: string, value: string) => {
        const newValue = searchParams.done === value ? undefined : value;
        setSearchParams((old) => ({
            ...old,
            [name]: newValue,
        }));
    };

    const handleSearchChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        setSearchParams((value) => ({
            ...value,
            search: e.target.value,
        }));

    return (
        <>
            <SearchTextField
                id="search"
                name="search"
                label="Search"
                delay={1000}
                onChange={handleSearchChange}
            />

            <FilterChip
                name="done"
                label="Dokončené"
                onClick={handleFilterChip}
                active={searchParams.done === "true"}
                value="true"
            />

            <FilterChip
                name="done"
                label="Nedokončené"
                onClick={handleFilterChip}
                active={searchParams.done === "false"}
                value="false"
            />
        </>
    );
};

export default TodoItemSearch;
