import PageContainer from "@/components/PageContainer";
import { Box, Sheet, useColorScheme } from "@mui/joy";
import { colors } from "@/utils/Colors";
import Achievements from "./experiences/Achievements";
import School from "./experiences/School";
import Hobbies from "./experiences/Hobbies";

export default function Experiences() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <PageContainer sx={{ position: "relative",  minHeight: "100vh" }}>
      {/* --- BACKGROUND DECORATION --- */}
      <Sheet
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, ${colors.info}40 0%, transparent 60%)`,
          filter: "blur(100px)",
          opacity: isDark ? 0.3 : 0.2,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, px: 2 }}>
        {/* Achievements Section */}
        <Box 
            sx={{ 
                mb: 12,
                animation: "fadeInUp 0.8s ease-out",
                "@keyframes fadeInUp": {
                    "0%": { opacity: 0, transform: "translateY(40px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                } 
            }}
        >
          <Achievements />
        </Box>

        {/* Education Section */}
        <Box 
            sx={{ 
                mb: 12,
                animation: "fadeInUp 0.8s ease-out 0.2s backwards"
            }}
        >
          <School />
        </Box>
      </Box>
    </PageContainer>
  );
}