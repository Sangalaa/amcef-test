import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from './store'
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";


ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <CssBaseline />
                    <App />
                </LocalizationProvider>
            </SnackbarProvider>
        </Provider>
    </React.Fragment>,
    document.getElementById("root")
);
