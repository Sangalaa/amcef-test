import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import { default as TodoListComponent } from "../components/todoList";
import { GetTodoListsResponse, TodoList } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { RootState } from "../store";
import { todoListActions } from "../store/todoList-slice";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<RootState>(
        (state) => state.todoList.lists
    ) as TodoList[];
    const { data, loaded, error } = useAxios<GetTodoListsResponse>(
        "items",
        "GET",
        null
    );

    useEffect(() => {
        if (loaded && data) dispatch(todoListActions.setTodoLists(data));
    }, [loaded, data, error]);

    return (
        <>
            <Header />

            <Container
                maxWidth="lg"
                sx={(theme) => ({ marginTop: theme.spacing(15) })}
            >
                <Grid
                    container
                    spacing={5}
                    alignItems="center"
                    justifyContent="center"
                >
                    {todoLists.map((todoList) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <TodoListComponent
                                key={todoList.id}
                                title={todoList.title}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Home;
