import { Box, Sheet, useColorScheme } from "@mui/joy";
import { getColors } from "@/utils/Colors";

export const BackgroundElements = () => {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const isDark = mode === "dark";

  return (
    <>
      {/* Animated background gradient blobs */}
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
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
            },
            "50%": {
              transform: "translate(50px, 30px) scale(1.1)",
            },
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
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
            },
            "50%": {
              transform: "translate(-40px, -30px) scale(1.15)",
            },
          },
        }}
      />

      {/* Geometric shapes background */}
      {/* Circle 1 */}
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
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      />

      {/* Triangle 1 */}
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
            "0%, 100%": {
              transform: "translateY(0) rotate(0deg)",
            },
            "50%": {
              transform: "translateY(-30px) rotate(180deg)",
            },
          },
        }}
      />

      {/* Square 1 */}
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
            "0%": {
              transform: "rotate(0deg) scale(1)",
            },
            "50%": {
              transform: "rotate(180deg) scale(1.2)",
            },
            "100%": {
              transform: "rotate(360deg) scale(1)",
            },
          },
        }}
      />

      {/* Circle 2 - Small */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: `${colors.error}90`,
          opacity: isDark ? 0.7 : 0.5,
          animation: "pulse 4s ease-in-out infinite",
          zIndex: 0,
          boxShadow: `0 0 16px 2px ${colors.error}60`,
          "@keyframes pulse": {
            "0%, 100%": {
              transform: "scale(1)",
              opacity: isDark ? 0.7 : 0.5,
            },
            "50%": {
              transform: "scale(1.3)",
              opacity: isDark ? 0.9 : 0.7,
            },
          },
        }}
      />

      {/* Circle 3 - Outline */}
      <Box
        sx={{
          position: "absolute",
          bottom: "35%",
          left: "25%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: `4px dashed ${colors.warning}90`,
          opacity: isDark ? 0.6 : 0.45,
          animation: "rotate2 25s linear infinite reverse",
          zIndex: 0,
          boxShadow: `0 0 20px 2px ${colors.warning}60`,
          background: `radial-gradient(circle, ${colors.warning}20 0%, transparent 80%)`,
          "@keyframes rotate2": {
            "0%": {
              transform: "rotate(0deg) scale(1)",
            },
            "100%": {
              transform: "rotate(360deg) scale(1.1)",
            },
          },
        }}
      />

      {/* Star shape */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "30%",
          width: "90px",
          height: "90px",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          backgroundColor: `${colors.warning}80`,
          opacity: isDark ? 0.6 : 0.45,
          animation: "twinkle 6s ease-in-out infinite",
          zIndex: 0,
          boxShadow: `0 0 16px 2px ${colors.warning}60`,
          "@keyframes twinkle": {
            "0%, 100%": {
              transform: "scale(1) rotate(0deg)",
              opacity: isDark ? 0.6 : 0.45,
            },
            "50%": {
              transform: "scale(1.2) rotate(180deg)",
              opacity: isDark ? 0.8 : 0.6,
            },
          },
        }}
      />
    </>
  );
};
