import PageContainer from "@/components/PageContainer";
import Typography from "@/components/ui/Typography";
import { colors } from "@/utils/Colors";
import { Box, Grid } from "@mui/joy";
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

        <Grid container spacing={2}>
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
