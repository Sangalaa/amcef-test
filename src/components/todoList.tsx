import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface TodoListProps {
    title: string;
}

const TodoList: React.FC<TodoListProps> = ({ title }) => {
    return (
        <Card sx={{ width: "100%", height: "200px" }}>
            <CardActionArea
                sx={{ width: "100%", height: "100%" }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        align="center"
                    >
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default TodoList;
