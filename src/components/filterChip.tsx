import DoneIcon from "@mui/icons-material/Done";
import { Chip } from "@mui/material";

interface FilterChipProps {
    name: string;
    label: string;
    onClick: (name: string, value: string) => void;
    active: boolean;
    value: string;
}

const FilterChip: React.FC<FilterChipProps> = (({ name, value, label, onClick, active }) => {
    const handleClick = () => onClick(name, value)
    return (
        <Chip
            icon={active ? <DoneIcon /> : undefined}
            color={active ? "primary" : "default"}
            variant="outlined"
            label={label}
            onClick={handleClick}
        />
    );
});

export default FilterChip;
