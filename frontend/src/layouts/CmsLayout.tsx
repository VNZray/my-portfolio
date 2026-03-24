import * as React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  Sheet,
  Typography,
  useColorScheme,
} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import { Code, DarkMode, LightMode } from "@mui/icons-material";
import CmsSidebar from "@/components/CmsSidebar";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { getColors } from "@/utils/Colors";

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

export default function CmsLayout() {
  const { user, loading, isAdmin } = useAuth();
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  if (loading) return <Loading />;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <CmsSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        isMobile={isMobileSidebarOpen}
        closeMobileSidebar={() => setMobileSidebarOpen(false)}
      />

      {isMobileSidebarOpen && (
        <Box
          onClick={() => setMobileSidebarOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: { xs: "block", md: "none" },
          }}
        />
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: mode === "dark" ? "background.surface" : "#F5FBFF",
        }}
      >
        {/* Top Bar - matches portfolio nav */}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              variant="soft"
              color="neutral"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setMobileSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              level="h4"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                color: "text.primary",
              }}
              startDecorator={<Code />}
            >
              Manage
              <span style={{ color: colors.error }}>Portfolio</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ModeToggle />
            <Avatar variant="solid" color="primary" size="sm">
              RC
            </Avatar>
          </Box>
        </Sheet>

        {/* Main Content */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            overflow: "auto",
            flex: 1,
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
            © {new Date().getFullYear()} Rayven Clores. Portfolio
          </Typography>
        </Sheet>
      </Box>
    </Box>
  );
}
