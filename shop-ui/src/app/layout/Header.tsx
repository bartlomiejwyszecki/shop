import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Store
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
