import PageContainer from "@/components/PageContainer";
import { Box, Grid } from "@mui/joy";
import LeftColumn from "./about/LeftColumn";
import TechStack from "./about/TechStack";
import Certifications from "./about/Certifications";

export default function About() {
  return (
    <PageContainer sx={{ position: "relative", overflow: "hidden" }}>
      {/* --- CONTENT GRID (Matches Home Layout) --- */}
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "85dvh",
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
            <TechStack />
            <Certifications />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
