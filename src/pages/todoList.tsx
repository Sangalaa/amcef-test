import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { GetTodoItemsResponse } from "../contracts/axios";
import useAxios from "../hooks/useAxios";

const TodoList: React.FC = () => {
    const { id } = useParams();
    const { data, error, loaded } = useAxios<GetTodoItemsResponse>(
        `items/${id}/lists`,
        "GET",
        null
    );

    return (
        <Header />
    );
};

export default TodoList;
