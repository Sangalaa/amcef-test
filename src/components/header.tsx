import { AppBar, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";

const Logo = styled(({ children, ...props }) => (
    <Typography variant="h6" component="a" href="/" {...props}>
        {children}
    </Typography>
))({
    color: "white",
    textDecoration: "none",
});

const Header: React.FC = () => {
    return (
        <AppBar component="nav">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo>Todo App</Logo>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
