import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Set default base URL for all Axios requests
const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL_PROD
  : import.meta.env.VITE_API_BASE_URL_LOCAL;

axios.defaults.baseURL = baseURL;

// Include credentials (such as cookies) in cross-origin requests
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Inter, system-ui, Avenir, sans-serif;",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
