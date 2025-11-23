import {
  AspectRatio,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Stack,
  useColorScheme,
} from "@mui/joy";
import Typography from "@/components/ui/Typography";
import { colors } from "@/utils/Colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

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

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";
  return (
    <Card
      variant="soft"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "all 0.3s ease",
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 10px 40px -10px ${colors.warning}40`,
          borderColor: `${colors.warning}60`,
          "& .project-image": {
            transform: "scale(1.1)",
          },
        },
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* Image Container */}
      <AspectRatio ratio="16/9" sx={{ overflow: "hidden", borderRadius: "md" }}>
        <Box
          className="project-image"
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Overlay on hover */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            opacity: 0.6,
          }}
        />
      </AspectRatio>

      {/* Content */}
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography.CardTitle color={isDark ? "light" : "dark"}>
            {project.title}
          </Typography.CardTitle>
          <Typography.Body
            size="xs"
            sx={{ mt: 1, color: "text.secondary", lineClamp: 3 }}
          >
            {project.description}
          </Typography.Body>
        </Box>

        {/* Tech Stack Chips */}
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {project.techStack.map((tech) => (
            <Chip
              key={tech}
              size="sm"
              variant="outlined"
              color="warning"
              sx={{ bgcolor: "rgba(255, 153, 0, 0.1)" }}
            >
              {tech}
            </Chip>
          ))}
        </Stack>

        {/* Languages (Smaller/Different style) */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ mt: "auto", pt: 1 }}
        >
          <Typography.Label size="xs" color={isDark ? "light" : "dark"} sx={{ opacity: 0.7 }}>
            Languages:
          </Typography.Label>
          {project.languages.map((lang) => (
            <Typography.Label key={lang} size="xs" color="info">
              {lang}
            </Typography.Label>
          ))}
        </Stack>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          component="a"
          href={project.githubUrl}
          target="_blank"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ "&:hover": { color: colors.warning } }}
        >
          <GitHubIcon />
        </IconButton>

        <Button
          component="a"
          href={project.liveUrl}
          target="_blank"
          variant="solid"
          color="warning"
          size="sm"
          endDecorator={<ArrowOutwardIcon />}
          startDecorator={<LanguageIcon />}
        >
          Live Demo
        </Button>
      </Box>
    </Card>
  );
}
