import { Box, Typography, useColorScheme } from "@mui/joy";
import { colors } from "@/utils/Colors";
import { BackgroundElements } from "@/components/ui/BackgroundElements";

export default function Loading() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "background.body",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Reuse background for consistency, slightly dimmed */}
      <Box sx={{ opacity: 0.5, filter: "grayscale(50%)" }}>
        <BackgroundElements />
      </Box>

      {/* Loader Container */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 1,
        }}
      >
        {/* Hexagon Spinner Wrapper */}
        <Box sx={{ position: "relative", width: "120px", height: "120px" }}>
          {/* Outer Ring */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `4px solid transparent`,
              borderTopColor: colors.warning,
              animation: "spin 2s linear infinite",
              boxShadow: `0 0 15px ${colors.warning}40`,
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          
          {/* Inner Reverse Ring */}
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              bottom: "10px",
              borderRadius: "50%",
              border: `4px solid transparent`,
              borderBottomColor: colors.error,
              animation: "spinReverse 1.5s linear infinite",
              boxShadow: `0 0 15px ${colors.error}40`,
              "@keyframes spinReverse": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(-360deg)" },
              },
            }}
          />

          {/* Central Hexagon Pulse */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40px",
              height: "40px",
              backgroundColor: isDark ? "white" : "black",
              clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
              animation: "pulseHex 1s ease-in-out infinite alternate",
              "@keyframes pulseHex": {
                "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: 0.5 },
                "100%": { transform: "translate(-50%, -50%) scale(1.1)", opacity: 1 },
              },
            }}
          />
        </Box>

        {/* Text Loading */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            level="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: isDark ? "white" : "neutral.800",
              textTransform: "uppercase",
              fontSize: "1.5rem",
              mb: 1,
            }}
          >
            Loading
          </Typography>
          <Box
            sx={{
              height: "4px",
              width: "150px",
              background: "rgba(128,128,128,0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "40%",
                background: `linear-gradient(90deg, ${colors.warning}, ${colors.error})`,
                animation: "barMove 1.5s ease-in-out infinite",
                borderRadius: "2px",
                "@keyframes barMove": {
                  "0%": { left: "-40%" },
                  "50%": { left: "100%" },
                  "100%": { left: "-40%" },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}