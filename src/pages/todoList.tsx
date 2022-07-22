import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { GetTodoItemsResponse, TodoItem } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { RootState } from "../store";
import { todoListActions } from "../store/todoList-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {default as TodoItemComponent} from "../components/todoItem";

const TodoList: React.FC = () => {
    const { id } = useParams();
    const { axiosFetch } = useAxios<GetTodoItemsResponse>();
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    const todoItems = useSelector<RootState>((state) => state.todoList.items) as TodoItem[];

    useEffect(() => {
        axiosFetch(`items/${id}/lists`, "GET", {})
            .then((data) => {
                dispatch(todoListActions.setTodoItems(data));
            })
            .catch(() =>
                enqueueSnackbar(
                    "Nastala neočakávaná chyba pri sťahovaní todo itemov",
                    { variant: "error" }
                )
            );
    }, [id]);

    return (
        <>
            <Header />

            <Container maxWidth="lg">
                <Grid
                    container
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
        </>
    );
};

export default TodoList;
