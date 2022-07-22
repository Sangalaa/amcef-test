import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodoForm from "../components/addTodoForm";
import Header from "../components/header";
import { default as TodoListComponent } from "../components/todoList";
import { GetTodoListsResponse, TodoList } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { RootState } from "../store";
import { todoListActions } from "../store/todoList-slice";

const Home: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const dispatch = useDispatch();

    const todoLists = useSelector<RootState>(
        (state) => state.todoList.lists
    ) as TodoList[];

    const { axiosFetch } = useAxios<GetTodoListsResponse>();

    useEffect(() => {
        axiosFetch("items", "GET", {}).then((data) =>
            dispatch(todoListActions.setTodoLists(data))
        );
    }, []);

    return (
        <>
            <Header />

            <Container
                maxWidth="lg"
                sx={(theme) => ({ marginTop: theme.spacing(15) })}
                component="section"
            >
                <Typography variant="h3" align="center" component="h2">
                    Todo zoznamy
                </Typography>

                <AddTodoForm />

                <Paper
                    sx={(theme) => ({
                        padding: theme.spacing(5),
                    })}
                    elevation={0}
                >
                    <Button fullWidth onClick={handleOpenModal}>
                        Nový zoznam
                    </Button>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={5}
                        sx={(theme) => ({ marginTop: theme.spacing(0.5) })}
                    >
                        {todoLists.map((todoList) => (
                            <Grid item xs={12} sm={4} md={4}>
                                <TodoListComponent
                                    key={todoList.id}
                                    title={todoList.title}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default Home;
