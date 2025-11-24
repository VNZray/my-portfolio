import Typography from "@/components/ui/Typography";
import { Box, Button, Chip, Stack } from "@mui/joy";
import { colors } from "@/utils/Colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const LeftColumn = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography.Label
          color="warning"
          sx={{
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mb: 1,
            display: "block",
          }}
        >
          Discover
        </Typography.Label>
        <Typography.Title sx={{ lineHeight: 1.1 }}>
          About <span style={{ color: colors.warning }}>Me</span>
        </Typography.Title>
      </Box>

      <Typography.Header size="sm" weight="normal" color="default">
        Passionate Developer & UI/UX Enthusiast
      </Typography.Header>

      <Typography.Body
        size="normal"
        sx={{ color: "text.secondary", maxWidth: "90%" }}
      >
        I am a creative developer who bridges the gap between engineering and
        design. With a keen eye for detail and a love for clean code, I build
        digital experiences that are not only functional but also visually
        stunning.
      </Typography.Body>

      <Typography.Body
        size="normal"
        sx={{ color: "text.secondary", maxWidth: "90%" }}
      >
        My journey started with a simple curiosity about how things work on the
        web, which evolved into a career crafting robust applications. I thrive
        on solving complex problems and learning new technologies to stay ahead
        of the curve.
      </Typography.Body>

      <Box sx={{ pt: 2 }}>
        <Button
          component={Link}
          to="/projects"
          size="lg"
          variant="solid"
          color="warning"
          endDecorator={<ArrowForwardIcon />}
          sx={{ borderRadius: "xl", px: 4 }}
        >
          View My Work
        </Button>
      </Box>
    </Box>
  );
};

export default LeftColumn;