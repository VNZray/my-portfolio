import {
  AspectRatio,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  useColorScheme,
} from "@mui/joy";
import Typography from "@/components/ui/Typography";
import { getColors } from "@/utils/Colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Card from "@/components/Card";
import { isPdf, pdfEmbedUrl } from "@/utils/isPdf";
import type { Project } from "@/types/User";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const isDark = mode === "dark";
  return (
    <Card index={index} hoverable orientation="vertical">
      {/* Image Container */}
      {project.image_url && (
        <AspectRatio
          ratio="16/9"
          sx={{ overflow: "hidden", borderRadius: "md" }}
        >
          {isPdf(project.image_url) ? (
            <Box
              component="iframe"
              src={pdfEmbedUrl(project.image_url)}
              title={project.title}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
            />
          ) : (
            <Box
              className="project-image"
              component="img"
              src={project.image_url}
              alt={project.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
          )}
          {/* Overlay on hover */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              opacity: 0.6,
            }}
          />
        </AspectRatio>
      )}

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
        {project.tech_stack.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {project.tech_stack.map((tech) => (
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
        )}

        {/* Category */}
        {project.category && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            sx={{ mt: "auto", pt: 1 }}
          >
            <Typography.Label
              size="xs"
              color={isDark ? "light" : "dark"}
              sx={{ opacity: 0.7 }}
            >
              Category:
            </Typography.Label>
            <Typography.Label size="xs" color="info">
              {project.category}
            </Typography.Label>
          </Stack>
        )}
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
        {project.github_url && (
          <IconButton
            component="a"
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ "&:hover": { color: colors.warning } }}
          >
            <GitHubIcon />
          </IconButton>
        )}

        {project.live_url && (
          <Button
            component="a"
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            color="warning"
            size="sm"
            endDecorator={<ArrowOutwardIcon />}
            startDecorator={<LanguageIcon />}
          >
            Live Demo
          </Button>
        )}
      </Box>
    </Card>
  );
}
