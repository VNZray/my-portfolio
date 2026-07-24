import { useEffect, useState } from "react";
import { Box, CardContent, Grid, useColorScheme } from "@mui/joy";
import Typography from "@/components/ui/Typography";
import PortfolioCard from "@/components/Card";
import Loading from "@/components/Loading";
import { certificateService } from "@/services/certificateService";
import { projectService } from "@/services/projectService";
import { achievementService } from "@/services/achievementService";
import { inquiryService } from "@/services/inquiryService";
import { visitService } from "@/services/visitService";
import { socialService } from "@/services/socialService";
import { techStackService } from "@/services/techStackService";
import { getColors } from "@/utils/Colors";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import LayersIcon from "@mui/icons-material/Layers";

interface StatCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function CMSDashboard() {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        certs,
        projects,
        achievements,
        unread,
        visits,
        socials,
        techStack,
      ] = await Promise.all([
        certificateService.getAll(),
        projectService.getAll(),
        achievementService.getAll(),
        inquiryService.getUnreadCount(),
        visitService.getTotalCount(),
        socialService.getAll(),
        techStackService.getAll(),
      ]);

      setStats([
        {
          title: "Certificates",
          count: certs.length,
          icon: <WorkspacePremiumIcon sx={{ fontSize: 36 }} />,
          color: colors.secondary,
        },
        {
          title: "Projects",
          count: projects.length,
          icon: <CodeIcon sx={{ fontSize: 36 }} />,
          color: colors.success,
        },
        {
          title: "Achievements",
          count: achievements.length,
          icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
          color: colors.warning,
        },

        {
          title: "Unread Messages",
          count: unread,
          icon: <MailIcon sx={{ fontSize: 36 }} />,
          color: colors.error,
        },
        {
          title: "Socials",
          count: socials.length,
          icon: <ShareIcon sx={{ fontSize: 36 }} />,
          color: colors.info,
        },
        {
          title: "Tech Stack",
          count: techStack.length,
          icon: <LayersIcon sx={{ fontSize: 36 }} />,
          color: colors.warning,
        },
        {
          title: "Portfolio Visits",
          count: visits,
          icon: <VisibilityIcon sx={{ fontSize: 36 }} />,
          color: colors.primary,
        },
      ]);
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <Box>
      <Typography.Header size="md">Dashboard</Typography.Header>
      <Typography.Body size="sm" color="error">
        Welcome to your Portfolio CMS
      </Typography.Body>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid xs={12} sm={4} md={3} key={stat.title}>
            <PortfolioCard index={index} orientation="horizontal">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "14px",
                    bgcolor: `${stat.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography.Label size="sm" color="error">
                    {stat.title}
                  </Typography.Label>
                  <Typography.Title size="sm">{stat.count}</Typography.Title>
                </Box>
              </CardContent>
            </PortfolioCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
