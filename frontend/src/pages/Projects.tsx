import { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import Typography from "@/components/ui/Typography";
import { colors } from "@/utils/Colors";
import { Box, CircularProgress, Grid } from "@mui/joy";
import ProjectCard from "@/pages/projects/ProjectCard";
import { projectService } from "@/services/projectService";
import type { Project } from "@/types/User";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getVisible()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer sx={{ position: "relative", minHeight: "100vh" }}>
      {/* --- CONTENT --- */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, md: 0 },
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography.Label
            color="warning"
            sx={{
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              mb: 1,
              textAlign: "center",
            }}
          >
            Portfolio
          </Typography.Label>
          <Typography.Title
            sx={{
              textAlign: "center",
            }}
          >
            Featured <span style={{ color: colors.warning }}>Projects</span>
          </Typography.Title>
          <Typography.Body
            sx={{
              mt: 2,
              mx: "auto",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            A collection of applications demonstrating my expertise in frontend
            development, UI/UX design, and scalable architecture.
          </Typography.Body>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress color="warning" />
          </Box>
        ) : projects.length === 0 ? (
          <Typography.Body
            sx={{ textAlign: "center", color: "text.secondary", py: 8 }}
          >
            No projects to display yet.
          </Typography.Body>
        ) : (
          <Grid container spacing={2}>
            {projects.map((project, index) => (
              <Grid key={project.id} xs={12} md={6} lg={6} xl={3}>
                <ProjectCard project={project} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PageContainer>
  );
}
