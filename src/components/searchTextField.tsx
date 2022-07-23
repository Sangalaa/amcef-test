import SearchIcon from "@mui/icons-material/Search";
import { TextField, TextFieldProps } from "@mui/material";
import { useRef, ChangeEvent } from "react";

type SearchTextFieldProps = {
    delay: number
} & TextFieldProps

const SearchTextField: React.FC<SearchTextFieldProps> = ({delay, onChange, ...props}) => {
    const timer = useRef<NodeJS.Timeout>();
    
    const handleSearchInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => onChange && onChange(e), delay);
    };

    return (
        <TextField
            {...props}
            fullWidth
            InputProps={{
                startAdornment: <SearchIcon />,
            }}
            variant="standard"
            onChange={handleSearchInputChange}
        />
    );
};

export default SearchTextField;
