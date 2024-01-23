import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  List,
  ListItem,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const midLinks = [
  {
    title: "catalog",
    path: "/catalog",
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "contact",
    path: "/contact",
  },
];

const rightLinks = [
  {
    title: "login",
    path: "/login",
  },
  {
    title: "register",
    path: "/register",
  },
];

const linkStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "grey.900",
  },
};

const boxStyles = { display: "flex", alignItems: "center" };

interface HeaderProps {
  darkMode: boolean;
  darkModeChange: (changedDarkMode: boolean) => void;
}

export default function Header({ darkMode, darkModeChange }: HeaderProps) {
  const { shoppingCart } = useAppSelector(state => state.shoppingCart);

  const shoppingCartItemsCount = shoppingCart?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    darkModeChange(event.target.checked);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={boxStyles}>
          <Typography variant="h6" component={NavLink} to="/" sx={linkStyles}>
            Store
          </Typography>

          <Switch checked={darkMode} onChange={handleChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={linkStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={boxStyles}>
          <IconButton
            component={Link}
            to="/shopping-cart"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={shoppingCartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={linkStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
