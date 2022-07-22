import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from './store'


ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <App />
            </SnackbarProvider>
        </Provider>
    </React.Fragment>,
    document.getElementById("root")
);
