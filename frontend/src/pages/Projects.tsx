import PageContainer from "@/components/PageContainer";
import Typography from "@/components/ui/Typography";
import { colors } from "@/utils/Colors";
import { Box, Grid, Sheet, useColorScheme } from "@mui/joy";
import ProjectCard from "@/pages/projects/ProjectCard";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  languages: string[];
  githubUrl: string;
  liveUrl: string;
}

// Mock Data
const PROJECTS: ProjectData[] = [
  {
    id: "1",
    title: "CryptoDash - Analytics Platform",
    description:
      "A real-time cryptocurrency dashboard featuring live price tracking, interactive charts, and portfolio management tools. Built with high performance and data visualization in mind.",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React", "MUI Joy", "Recharts", "Redux"],
    languages: ["TypeScript", "CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
  {
    id: "2",
    title: "NeonChat - Realtime Messaging",
    description:
      "A sleek, dark-themed messaging application supporting private chats, group channels, and file sharing. Features end-to-end encryption and a responsive glassmorphism UI.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Next.js", "Supabase", "Tailwind", "Socket.io"],
    languages: ["TypeScript", "SQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
  {
    id: "3",
    title: "TaskFlow - AI Project Manager",
    description:
      "An intelligent task management tool that uses AI to prioritize daily workflows, suggest deadlines, and summarize meeting notes automatically.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
    techStack: ["Vue.js", "Firebase", "OpenAI API", "Pinia"],
    languages: ["JavaScript", "Python"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
  {
    id: "4",
    title: "EcoTrack - Sustainability App",
    description:
      "A mobile-first web app gamifying carbon footprint reduction. Users can track daily habits, compete in challenges, and visualize their environmental impact.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    techStack: ["React Native", "Node.js", "Express", "MongoDB"],
    languages: ["TypeScript", "Rust"],
    githubUrl: "https://github.com",
    liveUrl: "https://vercel.com",
  },
];

export default function Projects() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <PageContainer sx={{ position: "relative", minHeight: "100vh" }}>
      {/* --- BACKGROUND ANIMATIONS --- */}
      <Sheet
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${colors.warning}80 0%, transparent 70%)`,
          filter: "blur(70px)",
          opacity: isDark ? 0.55 : 0.45,
          animation: "float1 8s ease-in-out infinite",
          zIndex: 0,
          boxShadow: `0 0 60px 10px ${colors.warning}60`,
          "@keyframes float1": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(50px, 30px) scale(1.1)" },
          },
        }}
      />
      <Sheet
        sx={{
          position: "absolute",
          top: "50%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${colors.error}80 0%, transparent 70%)`,
          filter: "blur(70px)",
          opacity: isDark ? 0.5 : 0.4,
          animation: "float2 10s ease-in-out infinite",
          zIndex: 0,
          boxShadow: `0 0 60px 10px ${colors.error}60`,
          "@keyframes float2": {
            "0%, 100%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(-40px, -30px) scale(1.15)" },
          },
        }}
      />

      {/* Geometric Background Shapes (Reused) */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: `3px solid ${colors.warning}90`,
          opacity: isDark ? 0.7 : 0.5,
          animation: "rotate 20s linear infinite",
          zIndex: 0,
          boxShadow: `0 0 30px 5px ${colors.warning}60`,
          background: `radial-gradient(circle, ${colors.warning}20 0%, transparent 80%)`,
          "@keyframes rotate": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 0,
          height: 0,
          borderLeft: "60px solid transparent",
          borderRight: "60px solid transparent",
          borderBottom: `100px solid ${colors.error}80`,
          opacity: isDark ? 0.5 : 0.35,
          animation: "float3 12s ease-in-out infinite",
          zIndex: 0,
          filter: `drop-shadow(0 8px 20px ${colors.error}60)`,
          "@keyframes float3": {
            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
            "50%": { transform: "translateY(-30px) rotate(180deg)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "8%",
          width: "80px",
          height: "80px",
          border: `4px solid ${colors.warning}90`,
          opacity: isDark ? 0.6 : 0.45,
          animation: "spin 15s linear infinite",
          zIndex: 0,
          boxShadow: `0 0 20px 2px ${colors.warning}60`,
          background: `linear-gradient(135deg, ${colors.warning}20 0%, transparent 100%)`,
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg) scale(1)" },
            "50%": { transform: "rotate(180deg) scale(1.2)" },
            "100%": { transform: "rotate(360deg) scale(1)" },
          },
        }}
      />

      {/* --- CONTENT --- */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          py: 4,
          px: { xs: 2, md: 6 },
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

        <Grid container spacing={4}>
          {PROJECTS.map((project, index) => (
            <Grid key={project.id} xs={12} md={3} lg={3}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
}
