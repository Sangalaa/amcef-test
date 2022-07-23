import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { date, object, string } from "yup";
import { PostTodoListItemResponse } from "../contracts/axios";
import useAxios from "../hooks/useAxios";
import { todoListActions } from "../store/todoList-slice";

type Fields = {
    title: string;
    description: string;
    deadline: Date | null;
};

const validationSchema = object({
    title: string().trim().required("Názov je povinný"),
    description: string().trim().required("Popis úlohy je povinný"),
    deadline: date()
        .min(new Date(), "Termín splnenia úlohy musí byť dátum v budúcnosti")
        .required("Termín splnenia úlohy je povinný")
        .typeError("Termín splnenia má nesprávny formát"),
});

interface AddTodoItemFormProps {
    todoListId: string;
}

const AddTodoItemForm: React.FC<AddTodoItemFormProps> = ({ todoListId }) => {
    const { axiosFetch } = useAxios<PostTodoListItemResponse>();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values: Fields) => {
        try {
            const todoListItem = await axiosFetch(
                `items/${todoListId}/lists`,
                "POST",
                values
            );

            dispatch(todoListActions.addTodoItem(todoListItem));

            enqueueSnackbar(
                `Todo item ${todoListItem?.title} bol úspešne pridaný`,
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
            description: "",
            deadline: null,
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
            <TextField
                id="description"
                name="description"
                label="Popis úlohy"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                }
                helperText={
                    formik.touched.description && formik.errors.description
                }
            />
            <DateTimePicker
                disablePast
                label="Termín splnenia úlohy"
                value={formik.values.deadline}
                onChange={(value) =>
                    formik.setFieldValue("deadline", value, true)
                }
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        id="deadline"
                        name="deadline"
                        error={
                            formik.touched.deadline &&
                            Boolean(formik.errors.deadline)
                        }
                        helperText={
                            formik.touched.deadline && formik.errors.deadline
                        }
                        onChange={formik.handleChange}
                    />
                )}
            />
            <Button color="primary" variant="outlined" type="submit">
                Pridaj
            </Button>
        </form>
    );
};

export default AddTodoItemForm;
