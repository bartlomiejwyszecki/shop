import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

interface HeaderProps {
  darkMode: boolean;
  darkModeChange: (changedDarkMode: boolean) => void;
}

export default function Header({ darkMode, darkModeChange }: HeaderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    darkModeChange(event.target.checked);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: "inherit" }}>
          Store
        </Typography>
        <Switch checked={darkMode} onChange={handleChange} />
      </Toolbar>
    </AppBar>
  );
}
