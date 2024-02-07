import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { testErrorsHttp } from "../../api/httpClient";

export default function AboutPage() {
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        About us
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => testErrorsHttp.get400Error().catch(error => console.log(error))}
        >
          400 Error
        </Button>

        <Button
          variant="contained"
          onClick={() => testErrorsHttp.get500Error()}
        >
          500 Error
        </Button>
      </ButtonGroup>
    </Container>
  );
}
