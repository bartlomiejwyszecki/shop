import Catalog from "../features/catalog/Catalog";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {
  return (
    <>
      <CssBaseline />

      <Header />

      <Container>
        <Catalog></Catalog>
      </Container>
    </>
  );
}

export default App;
