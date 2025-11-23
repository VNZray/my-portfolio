// RightColumn.tsx

import { Box, useColorScheme } from "@mui/joy";
import placeholder from "@/assets/Hutao.png";
import { colors } from "@/utils/Colors";

const RightColumn = () => {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "300px", sm: "400px", md: "500px", lg: "550px" },
        height: { xs: "300px", sm: "400px", md: "500px", lg: "550px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.warning}40 0%, transparent 70%)`,
          filter: "blur(40px)",
          animation: "pulse 3s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              transform: "scale(1)",
              opacity: 0.6,
            },
            "50%": {
              transform: "scale(1.1)",
              opacity: 0.8,
            },
          },
        }}
      />

      {/* Main image container */}
      <Box
        sx={{
          position: "relative",
          width: "90%",
          height: "90%",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
          boxShadow: `0 0 50px ${colors.warning}60, 0 0 100px ${colors.warning}30`,
          transition: "all 0.5s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: `0 0 60px ${colors.warning}80, 0 0 120px ${colors.warning}40`,
            border: `3px solid ${colors.warning}60`,
          },
        }}
      >
        {/* Image overlay gradient */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${colors.warning}20 0%, transparent 50%, ${colors.error}20 100%)`,
            zIndex: 1,
            mixBlendMode: isDark ? "overlay" : "multiply",
            opacity: 0.3,
          }}
        />

        <img
          width="100%"
          height="100%"
          style={{ 
            objectFit: "cover",
            display: "block",
            filter:  isDark ? "brightness(0.9) contrast(1.1)" : "brightness(1) contrast(1)",
          }}
          src={placeholder}
          alt="Portrait"
        />
      </Box>

      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `2px solid ${colors.warning}60`,
          opacity: 0.6,
          animation: "float 4s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0) rotate(0deg)",
            },
            "50%": {
              transform: "translateY(-20px) rotate(180deg)",
            },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "-5%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: `2px solid ${colors.error}60`,
          opacity: 0.6,
          animation: "float 5s ease-in-out infinite reverse",
        }}
      />
    </Box>
  );
};

export default RightColumn;
