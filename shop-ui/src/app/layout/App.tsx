import "./App.css";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/get-cookie";
import { shoppingCartHttp } from "../api/httpClient";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { setShoppingCart } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customerId = getCookie('customerId');

    if (customerId) {
      shoppingCartHttp.get()
        .then(shoppingCart => setShoppingCart(shoppingCart))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
    }
  }, [setShoppingCart]);

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

  if (isLoading) {
    return <LoadingComponent message="App is loading..."/>
  }

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
