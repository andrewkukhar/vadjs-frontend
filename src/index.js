import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { enableMapSet } from "immer";

enableMapSet();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
