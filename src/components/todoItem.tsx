import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { TodoItem as TodoItemType } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { todoListActions } from "../store/todoList-slice";

interface TodoItemProps {
    id: string;
    todoListId: string;
    title: string;
    description: string;
    deadline: Date;
    done: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
    id,
    todoListId,
    title,
    description,
    deadline,
    done,
}) => {
    const { axiosFetch } = useAxios<TodoItemType>();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const switchDoneStatus = (done: boolean) => {
        axiosFetch(`items/${todoListId}/lists/${id}`, "PUT", { done })
            .then(() => {
                dispatch(todoListActions.updateTodoItemStatus({ done, id }));
                enqueueSnackbar("Status bol aktualizovaný", {
                    variant: "success",
                });
            })
            .catch(() =>
                enqueueSnackbar(
                    "Nastala neočakávaná chyba pri aktualizácií statusu",
                    {
                        variant: "error",
                    }
                )
            );
    };

    const handleDone = () => switchDoneStatus(true);

    const handleUndone = () => switchDoneStatus(false);

    const handleDelete = () => {
        axiosFetch(`items/${todoListId}/lists/${id}`, "DELETE", {})
            .then(() => {
                dispatch(todoListActions.removeTodoItem(id));
                enqueueSnackbar("Todo item bol úspešne vymazaný", {
                    variant: "success",
                });
            })
            .catch(() =>
                enqueueSnackbar("Nastala neočakávaná chyba pri mazaní itemu", {
                    variant: "error",
                })
            );
    };

    return (
        <Card
            sx={{
                backgroundColor: done ? "#e3f2fd" : null,
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        padding: theme.spacing(1),
                    })}
                >
                    <AccessAlarmIcon />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={(theme) => ({ marginLeft: theme.spacing(1) })}
                    >
                        {deadline.toLocaleString()}
                    </Typography>
                </Box>
                <Box>
                    {!done ? (
                        <IconButton onClick={handleDone} aria-label="Dokončiť">
                            <DoneIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={handleUndone}
                            aria-label="Označiť ako nedokončené"
                        >
                            <ReplayIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={handleDelete} aria-label="Vymazať">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default TodoItem;
