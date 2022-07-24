import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TodoItem } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { todoListActions } from "../store/todoList-slice";
import FilterChip from "./filterChip";
import SearchTextField from "./searchTextField";

type SearchParams = {
    title?: string;
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

    const { enqueueSnackbar } = useSnackbar()

    const dispatch = useDispatch();

    useEffect(() => {
        axiosFetch(`lists/${todoListId}/items`, "GET", {}, searchParams)
            .then((todoItems) =>
                dispatch(todoListActions.setTodoItems(todoItems))
            )
            .catch(() =>
                enqueueSnackbar(
                    "Nastala neočakávaná chyba pri sťahovaní todo itemov",
                    { variant: "error" }
                )
            );
    }, [searchParams, todoListId]);

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
            title: e.target.value,
        }));

    return (
        <Box>
            <SearchTextField
                id="search"
                name="search"
                label="Search"
                delay={1000}
                onChange={handleSearchChange}
            />

            <Grid container columnGap={1} sx={(theme) => ({ marginTop: theme.spacing(1) })}>
                <Grid item>
                    <FilterChip
                        name="done"
                        label="Dokončené"
                        onClick={handleFilterChip}
                        active={searchParams.done === "true"}
                        value="true"
                    />
                </Grid>

                <Grid item>
                    <FilterChip
                        name="done"
                        label="Nedokončené"
                        onClick={handleFilterChip}
                        active={searchParams.done === "false"}
                        value="false"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TodoItemSearch;
