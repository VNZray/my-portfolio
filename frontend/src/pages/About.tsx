import PageContainer from "@/components/PageContainer";
import { colors } from "@/utils/Colors";
import { Box, Grid, useColorScheme } from "@mui/joy";
import LeftColumn from "./about/LeftColumn";

export default function About() {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <PageContainer sx={{ position: "relative", overflow: "hidden" }}>
      {/* Pentagon */}
      <Box
        sx={{
          position: "absolute",
          bottom: "45%",
          right: "12%",
          width: "85px",
          height: "85px",
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          border: `3px solid ${colors.error}90`,
          opacity: isDark ? 0.6 : 0.45,
          animation: "float5 11s ease-in-out infinite",
          zIndex: 0,
          boxShadow: `0 0 16px 2px ${colors.error}60`,
          background: `linear-gradient(120deg, ${colors.error}20 0%, transparent 100%)`,
          "@keyframes float5": {
            "0%, 100%": {
              transform: "translateY(0) translateX(0)",
            },
            "50%": {
              transform: "translateY(-25px) translateX(15px)",
            },
          },
        }}
      />
      {/* --- CONTENT GRID (Matches Home Layout) --- */}
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "85vh",
          position: "relative",
          zIndex: 1,
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Grid xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: { xs: 1, md: 2 },
              animation: "fadeInLeft 1s ease-out",
              "@keyframes fadeInLeft": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <LeftColumn />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
