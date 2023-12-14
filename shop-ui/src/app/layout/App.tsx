import "./App.css";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      background: {
        default: 'rgb(230, 230, 230)'
      },
      mode: paletteType,
    },
  });

  const handleDarkModeChange = (darkModeChecked: boolean) => {
    setDarkMode(darkModeChecked);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored" />

      <CssBaseline />

      <Header darkMode={darkMode} darkModeChange={handleDarkModeChange} />

      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
