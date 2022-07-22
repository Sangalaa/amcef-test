import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "./components/header";
import { TodoList, todoListActions } from "./store/todoList-slice";
import { RootState } from "./store";
import { useEffect } from "react";
import {default as TodoListComponent} from "./components/todoList";
import useAxios from "./hooks/useAxios";

export default function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<RootState>((state) => state.todoList.lists) as TodoList[]
    const { data, loaded, error } = useAxios("items", "GET", null)

    useEffect(() => {
      if(loaded && data) dispatch(todoListActions.setTodoLists(data))
    }, [loaded, data, error])

    return (
        <Container maxWidth="md">
            <Header />
            <Typography>Hello World</Typography>
            <Grid container spacing={5} alignItems="center" justifyContent="center">
                {todoLists.map((list) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <TodoListComponent title={list.title} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
