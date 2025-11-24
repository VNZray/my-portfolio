// home/LeftColumn.tsx

import Typography from "@/components/ui/Typography";
import { Box, IconButton, useColorScheme } from "@mui/joy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@/components/ui/Button";
import { colors } from "@/utils/Colors";
import Container from "@/components/Container";

const LeftColumn = () => {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <>
      <Typography.Title
        level="h2"
        sx={{
          opacity: 0.5,
          fontWeight: 400,
          fontSize: { xs: "1.25rem", md: "1.50rem" },
          mb: 0.5,
        }}
      >
        Hi I am
      </Typography.Title>

      <Typography.Header
        sx={{
          fontSize: { xs: "1.5rem", md: "3rem" },
          fontWeight: 600,
          mb: 1,
          color: isDark ? colors.white : colors.dark,
        }}
      >
        Rayven Clores
      </Typography.Header>

      <Typography.Title
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "3.5rem" },
          background: `linear-gradient(90deg, ${colors.warning} 0%, ${colors.error} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}
        level="h1"
      >
        Full Stack Developer & UI/UX Designer
      </Typography.Title>

      <Box sx={{ display: "flex", gap: 1.5, my: 3 }}>
        <IconButton
          variant="outlined"
          sx={{
            color: isDark ? colors.white : colors.dark,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: colors.warning,
              backgroundColor: `${colors.warning}15`,
              transform: "translateY(-3px)",
            },
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          sx={{
            color: isDark ? colors.white : colors.dark,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: colors.warning,
              backgroundColor: `${colors.warning}15`,
              transform: "translateY(-3px)",
            },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          sx={{
            color: isDark ? colors.white : colors.dark,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: colors.warning,
              backgroundColor: `${colors.warning}15`,
              transform: "translateY(-3px)",
            },
          }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          sx={{
            color: isDark ? colors.white : colors.dark,
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: colors.warning,
              backgroundColor: `${colors.warning}15`,
              transform: "translateY(-3px)",
            },
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Button
          variant="solid"
          colorScheme="warning"
          size="lg"
          sx={{

            borderRadius: "8px",
            fontWeight: 600,
            transition: "all 0.3s ease",
          }}
        >
          Hire Me
        </Button>
        <Button
          variant="outlined"
          colorScheme="warning"
          sx={{

            borderRadius: "8px",
            fontWeight: 600,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              backgroundColor: `${colors.warning}10`,
            },
          }}
          size="lg"
        >
          Download CV
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 2 },
          flexWrap: "wrap",
        }}
      >
        <Container hoverEffect="glow" hoverGlowColor="rgba(255, 0, 0, 0.6)" background={isDark ? colors.dark : colors.white} hover gap="0" elevation={2} flex={1}>
          <Typography.Header
            sx={{
              color: colors.warning,
            }}
          >
            5+
          </Typography.Header>
          <Typography.Body
            sx={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            Experiences
          </Typography.Body>
        </Container>

        <Container hoverEffect="glow" hoverGlowColor="rgba(255, 0, 0, 0.6)" background={isDark ? colors.dark : colors.white} hover gap="0" elevation={2} flex={1}>
          <Typography.Header
            sx={{
              color: colors.warning,
            }}
          >
            20+
          </Typography.Header>
          <Typography.Body
            sx={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            Project done
          </Typography.Body>
        </Container>

        <Container hoverEffect="glow" hoverGlowColor="rgba(255, 0, 0, 0.6)" background={isDark ? colors.dark : colors.white} hover gap="0" elevation={2} flex={1}>
          <Typography.Header
            sx={{
              color: colors.warning,
            }}
          >
            80+
          </Typography.Header>
          <Typography.Body
            sx={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            Happy Clients
          </Typography.Body>
        </Container>
      </Box>
    </>
  );
};

export default LeftColumn;
