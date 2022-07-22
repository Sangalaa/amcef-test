import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import { PostTodoListResponse } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { todoListActions } from "../store/todoList-slice";

type Fields = {
    title: string;
};

const validationSchema = object({
    title: string().trim().required("Názov je vyžadovaný"),
});

const AddTodoForm: React.FC = () => {
    const { axiosFetch } = useAxios<PostTodoListResponse>()

    const dispatch = useDispatch()

    const handleSubmit = async (values: Fields) => {
       const todoList = await axiosFetch("items", "POST", values);

       dispatch(todoListActions.addTodoList(todoList))
       formik.resetForm()
    };

    const formik = useFormik({
        initialValues: {
            title: "",
        } as Fields,
        validationSchema: validationSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id="title"
                name="title"
                label="Názov"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <Button color="primary" variant="outlined" type="submit">
                Pridaj
            </Button>
        </form>
    );
};

export default AddTodoForm;
