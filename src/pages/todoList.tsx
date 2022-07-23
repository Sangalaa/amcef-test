import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddTodoItemForm from "../components/addTodoItemForm";
import { default as TodoItemComponent } from "../components/todoItem";
import TodoItemSearch from "../components/todoItemSearch";
import { TodoItem } from "../contracts/axios";
import Layout from "../layouts/layout";
import { RootState } from "../store";
import { todoListActions } from "../store/todoList-slice";

const TodoList: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch()

    const todoItems = useSelector<RootState>(
        (state) => state.todoList.items
    ) as TodoItem[];

    useEffect(() => {
        dispatch(todoListActions.setTodoItems([]))
    }, [])

    return (
        <Layout>
            <Container
                maxWidth="lg"
                component="main"
                sx={(theme) => ({ marginTop: theme.spacing(15) })}
            >
                <Typography variant="h3" align="center" component="h2">
                    Todo itemy
                </Typography>

                {/* new item form */}
                <Paper
                    elevation={0}
                    component="section"
                    sx={(theme) => ({
                        marginTop: theme.spacing(5),
                    })}
                >
                    <AddTodoItemForm todoListId={id as string} />
                </Paper>

                {/* search with filters */}
                <Paper
                    elevation={0}
                    component="section"
                    sx={(theme) => ({
                        marginTop: theme.spacing(5),
                    })}
                >
                    <TodoItemSearch todoListId={id as string} />
                </Paper>

                {/* list of items */}
                <Grid
                    container
                    component="section"
                    alignItems="center"
                    justifyContent="center"
                    spacing={5}
                    sx={(theme) => ({ marginTop: theme.spacing(0.5) })}
                >
                    {todoItems.map((todoItem) => (
                        <Grid key={todoItem.id} item xs={12}>
                            <TodoItemComponent
                                id={todoItem.id}
                                todoListId={id as string}
                                title={todoItem.title}
                                description={todoItem.description}
                                deadline={new Date(todoItem.deadline)}
                                done={todoItem.done}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
};

export default TodoList;
