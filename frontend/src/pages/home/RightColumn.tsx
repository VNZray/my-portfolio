import { Box, useColorScheme } from "@mui/joy";
import placeholder from "@/assets/Hutao.png"; // Using same placeholder or change to a specific about image
import { colors } from "@/utils/Colors";
import Typography from "@/components/ui/Typography";

const RightColumn = () => {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "300px", sm: "350px", md: "450px" },
        height: { xs: "300px", sm: "350px", md: "450px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Abstract Background Shape - Square rotation instead of circle for variety but consistency */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "60px", // Squircle shape
          transform: "rotate(45deg)",
          background: `linear-gradient(135deg, ${colors.warning}20 0%, transparent 60%)`,
          border: `2px solid ${colors.warning}40`,
          backdropFilter: "blur(5px)",
          animation: "floatSlow 8s ease-in-out infinite",
          zIndex: 0,
          "@keyframes floatSlow": {
            "0%, 100%": { transform: "rotate(45deg) translateY(0)" },
            "50%": { transform: "rotate(45deg) translateY(-20px)" },
          },
        }}
      />

      {/* Secondary Shape */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "60px",
          transform: "rotate(25deg) scale(0.9)",
          border: `2px dashed ${colors.error}40`,
          zIndex: 0,
          animation: "pulseRotate 15s linear infinite",
          "@keyframes pulseRotate": {
            "0%": { transform: "rotate(25deg) scale(0.9)" },
            "50%": { transform: "rotate(35deg) scale(0.95)" },
            "100%": { transform: "rotate(25deg) scale(0.9)" },
          },
        }}
      />

      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          overflow: "hidden",
          boxShadow: `0 20px 50px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)"}`,
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          zIndex: 1,
          "&:hover": {
            transform: "scale(1.02) translateY(-5px)",
          },
        }}
      >
         {/* Overlay Gradient */}
         <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom, transparent 60%, ${isDark ? "#000" : "#fff"} 100%)`,
            opacity: 0.3,
            zIndex: 2,
          }}
        />
        
        <img
          src={placeholder}
          alt="About Me"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isDark ? "brightness(0.9)" : "brightness(1)",
          }}
        />
      </Box>

      {/* Floating Badge */}
      <Box
        sx={{
          position: "absolute",
          bottom: "3%",
          right: "-15%",
          backgroundColor: "background.surface",
          padding: "1rem 1.5rem",
          borderRadius: "lg",
          boxShadow: "lg",
          zIndex: 3,
          animation: "floatBadge 6s ease-in-out infinite",
          border: "1px solid",
          borderColor: "divider",
          "@keyframes floatBadge": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      >
        <Typography.Label color="warning" sx={{ fontWeight: 800, fontSize: "1.2rem" }}>
          Hire me
        </Typography.Label>
        <Typography.Body size="xs" sx={{ whiteSpace: "nowrap" }}>
          Please!!!
        </Typography.Body>
      </Box>
    </Box>
  );
};

export default RightColumn;