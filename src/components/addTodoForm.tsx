import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
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
    const { axiosFetch } = useAxios<PostTodoListResponse>();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values: Fields) => {
        try {
            const todoList = await axiosFetch("lists", "POST", values);

            dispatch(todoListActions.addTodoList(todoList));

            enqueueSnackbar(
                `Todo list ${todoList?.title} bol úspešne pridaný`,
                {
                    variant: "success",
                }
            );
        } catch (error) {
            enqueueSnackbar("Nastala neočakávaná chyba", { variant: "error" });
        }

        formik.resetForm();
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
        <Paper
            elevation={0}
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: "flex",
                alignItems: "start",
            }}
        >
            <TextField
                id="title"
                name="title"
                label="Názov"
                variant="standard"
                sx={{ flex: 1 }}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <Button color="primary" variant="outlined" type="submit" sx={(theme) => ({marginLeft: theme.spacing(1), height: '48px'})}>
                Pridaj
            </Button>
        </Paper>
    );
};

export default AddTodoForm;
