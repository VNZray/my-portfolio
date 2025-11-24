import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Sheet,
  Typography,
  useColorScheme,
  Button,
  Box,
  IconButton,
  Avatar,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  ListDivider,
} from "@mui/joy";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu"; // Import Hamburger Icon
import placeholder from "@/assets/Hutao.jpg";
import { colors } from "@/utils/Colors";

// Mode Toggle Component
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IconButton
      variant="soft"
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}

export default function Layout() {
  const location = useLocation();
  const { mode } = useColorScheme();

  const navItems = ["Home",  "About", "Projects"];

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.body",
      }}
    >
      {/* Navigation Bar */}
      <Sheet
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: mode === "dark" ? "background.surface" : "#F5FBFF",
        }}
      >
        <Typography
          level="h4"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "text.primary" }}
        >
          vnz.
          <span style={{color: colors.error}}>dev</span>
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* --- DESKTOP NAV: Hidden on mobile (xs), visible on desktop (md) --- */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                component={Link}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                variant={
                  location.pathname ===
                  (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    ? "soft"
                    : "plain"
                }
                color="neutral"
              >
                {item}
              </Button>
            ))}
            <Button color="danger">Contact Us</Button>
          </Box>

          {/* --- MOBILE NAV: Visible on mobile (xs), hidden on desktop (md) --- */}
          <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral" } }}
              >
                <MenuIcon />
              </MenuButton>
              <Menu placement="bottom-end" sx={{ width: "100%" }}>
                {navItems.map((item) => (
                  <MenuItem
                  
                    key={item}
                    component={Link}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    selected={
                      location.pathname ===
                      (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                    }
                  >
                    {item}
                  </MenuItem>
                ))}
                <ListDivider />
                <MenuItem>Login</MenuItem>
              </Menu>
            </Dropdown>
          </Box>

          {/* --- ALWAYS VISIBLE --- */}
          <ModeToggle />

          <IconButton sx={{ borderRadius: "50%", padding: 0 }}>
            <Avatar color="warning" variant="solid">
              <img src={placeholder} width={"100%"} alt="" />
            </Avatar>
          </IconButton>
        </Box>
      </Sheet>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mx: "auto",
          width: "100%",
          bgcolor: mode === "dark" ? "background.surface" : "#F5FBFF",
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Sheet
        component="footer"
        sx={{
          p: 2,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: mode === "dark" ? "background.surface" : "#F5FBFF",
        }}
      >
        <Typography level="body-sm">
          © {new Date().getFullYear()} Rayven Clores. Built with React & MUI Joy
          UI.
        </Typography>
      </Sheet>
    </Sheet>
  );
}
