import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Store
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}
