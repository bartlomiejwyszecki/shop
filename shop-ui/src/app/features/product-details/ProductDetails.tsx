import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return <Typography variant="h2">Product details</Typography>;
}
