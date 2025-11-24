import PageContainer from "@/components/PageContainer";
import { Box, Grid } from "@mui/joy";
import LeftColumn from "./home/LeftColumn";
import RightColumn from "./home/RightColumn";

export default function Home() {
  return (
    <PageContainer sx={{ position: "relative"}}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ 
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid xs={12} sm={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: { xs: 2, md: 2 },
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
        <Grid xs={12} sm={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: "40vh", sm: "40vh", md: "100%" },
              gap: 4,
              padding: { xs: 1, md: 2 },
              animation: "fadeInRight 1s ease-out",
              "@keyframes fadeInRight": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <RightColumn />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}