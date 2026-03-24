import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
  Sheet,
  IconButton,
  Divider,
  Tooltip,
  useColorScheme,
} from "@mui/joy";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import LayersIcon from "@mui/icons-material/Layers";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Home, Logout } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { getColors } from "@/utils/Colors";

interface CmsSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  closeMobileSidebar: () => void;
}

const cmsMenuItems = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/cms" },
  {
    title: "Certificates",
    icon: <WorkspacePremiumIcon />,
    path: "/cms/certificates",
  },
  { title: "Projects", icon: <CodeIcon />, path: "/cms/projects" },
  {
    title: "Achievements",
    icon: <EmojiEventsIcon />,
    path: "/cms/achievements",
  },
  { title: "Education", icon: <SchoolIcon />, path: "/cms/education" },
  { title: "Socials", icon: <ShareIcon />, path: "/cms/socials" },
  { title: "Tech Stack", icon: <LayersIcon />, path: "/cms/tech-stack" },
  { title: "Inquiries", icon: <MailIcon />, path: "/cms/inquiries" },
];

export default function CmsSidebar({
  isCollapsed,
  closeMobileSidebar,
  isMobile,
}: CmsSidebarProps) {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const selectedSx = {
    "&.Mui-selected": {
      bgcolor: `${colors.light}30`,
      color: "inherit",
      fontWeight: "bold",
    },
    "&.Mui-selected:hover": {
      bgcolor: `${colors.light}40`,
    },
    transition: "all 0.2s ease",
  };

  return (
    <Sheet
      className="Sidebar"
      variant="solid"
      invertedColors
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: isMobile ? "translateX(0)" : "translateX(-100%)",
          md: "none",
        },
        transition:
          "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1000,
        height: "100dvh",
        width: isCollapsed ? "60px" : "260px",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRight: "1px solid",
        borderColor: "rgba(255,255,255,0.1)",
        bgcolor: mode === "dark" ? colors.light : colors.dark,
        overflow: "hidden",
      }}
    >
      {/* Logo / Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: 48,
          gap: 1,
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: `${colors.error}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CodeIcon sx={{ color: colors.error, fontSize: 20 }} />
        </Box>
        <Typography
          level="title-lg"
          sx={{
            whiteSpace: "nowrap",
            opacity: isCollapsed ? 0 : 1,
            transition: "opacity 0.2s",
            display: isCollapsed ? "none" : "block",
          }}
        >
          vnz.<span style={{ color: colors.error }}>dev</span>
        </Typography>
        <IconButton
          onClick={closeMobileSidebar}
          variant="plain"
          size="sm"
          sx={{ ml: "auto", display: { xs: "flex", md: "none" } }}
        >
          <MenuOpenIcon />
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      {/* Navigation */}
      <List
        size="sm"
        sx={{
          "--ListItem-radius": "10px",
          "--List-gap": "4px",
          mt: 1,
        }}
      >
        {cmsMenuItems.map((item) => (
          <ListItem key={item.title}>
            <Tooltip title={isCollapsed ? item.title : ""} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={closeMobileSidebar}
                sx={selectedSx}
              >
                {React.cloneElement(item.icon, {
                  sx: {
                    fontSize: 20,
                    color:
                      location.pathname === item.path
                        ? colors.error
                        : "inherit",
                    transition: "color 0.2s",
                  },
                })}
                <ListItemContent
                  sx={{
                    ml: 1.5,
                    opacity: isCollapsed ? 0 : 1,
                    display: isCollapsed ? "none" : "block",
                  }}
                >
                  <Typography level="title-sm">{item.title}</Typography>
                </ListItemContent>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Bottom Actions */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 1 }} />
        <List
          size="sm"
          sx={{ "--ListItem-radius": "10px", "--List-gap": "4px" }}
        >
          <ListItem>
            <Tooltip
              title={isCollapsed ? "Back to Site" : ""}
              placement="right"
            >
              <ListItemButton component={Link} to="/" sx={selectedSx}>
                <Home sx={{ fontSize: 20 }} />
                <ListItemContent
                  sx={{
                    ml: 1.5,
                    opacity: isCollapsed ? 0 : 1,
                    display: isCollapsed ? "none" : "block",
                  }}
                >
                  <Typography level="title-sm">Back to Site</Typography>
                </ListItemContent>
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip title={isCollapsed ? "Logout" : ""} placement="right">
              <ListItemButton onClick={handleLogout} sx={selectedSx}>
                <Logout sx={{ fontSize: 20 }} />
                <ListItemContent
                  sx={{
                    ml: 1.5,
                    opacity: isCollapsed ? 0 : 1,
                    display: isCollapsed ? "none" : "block",
                  }}
                >
                  <Typography level="title-sm">Logout</Typography>
                </ListItemContent>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
