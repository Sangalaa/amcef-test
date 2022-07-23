import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTodoForm from "../components/addTodoForm";
import Header from "../components/header";
import { default as TodoListComponent } from "../components/todoList";
import { GetTodoListsResponse, TodoList } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import Layout from "../layouts/layout";
import { RootState } from "../store";
import { todoListActions } from "../store/todoList-slice";

const Home: React.FC = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const todoLists = useSelector<RootState>(
        (state) => state.todoList.lists
    ) as TodoList[];

    const { axiosFetch } = useAxios<GetTodoListsResponse>();

    useEffect(() => {
        axiosFetch("items", "GET", {}).then((data) => {
            dispatch(todoListActions.setTodoLists(data));
        }).catch(() => {
            enqueueSnackbar("Nastala neočakávaná chyba pri sťahovaní údajov zo servera", { variant: "error" });
        });
    }, []);

    return (
        <Layout>
            <Container
                maxWidth="lg"
                sx={(theme) => ({ marginTop: theme.spacing(15) })}
                component="main"
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
                                    handleOnClick={() =>
                                        navigate(`list/${todoList.id}`)
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
};

export default Home;
