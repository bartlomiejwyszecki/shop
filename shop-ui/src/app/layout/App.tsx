import Catalog from "../features/catalog/Catalog";
import "./App.css";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  const handleDarkModeChange = (darkModeChecked: boolean) => {
    setDarkMode(darkModeChecked);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header darkMode={darkMode} darkModeChange={handleDarkModeChange} />

      <Container>
        <Catalog></Catalog>
      </Container>
    </ThemeProvider>
  );
}

export default App;
