import { Box, Card, Typography, Grid, AspectRatio, IconButton } from "@mui/joy";
import { colors } from "@/utils/Colors";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const GAMES = [
  { name: "Genshin Impact", img: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.svg" },
  { name: "Mobile Legends", img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Mobile_Legends_Bang_Bang_logo.svg/1200px-Mobile_Legends_Bang_Bang_logo.svg.png" },
  { name: "Honor of Kings", img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Honor_of_Kings_Logo.svg/1200px-Honor_of_Kings_Logo.svg.png" },
  { name: "Honkai: Star Rail", img: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Honkai_Star_Rail_logo.svg/1200px-Honkai_Star_Rail_logo.svg.png" },
  { name: "Once Human", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6C4D0y0M3g4N_T8Q5b4n6_V5h7k6l3m1n8o9p0q2r4s5t7u&s" }, // Placeholder
  { name: "Free Fire", img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Garena_Free_Fire_Logo.svg/1200px-Garena_Free_Fire_Logo.svg.png" },
];

export default function Hobbies() {
  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 8 }}>
      <Typography level="h3" sx={{ mb: 4, textAlign: "center" }}>
        Passion & <span style={{ color: colors.success }}>Hobbies</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Gaming Section */}
        <Grid xs={12} md={6}>
          <Card
            variant="soft"
            sx={{
              height: "100%",
              bgcolor: "rgba(0,0,0,0.2)",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SportsEsportsIcon sx={{ color: colors.warning }} />
              <Typography level="h4">Gaming</Typography>
            </Box>
            
            <Grid container spacing={2}>
              {GAMES.map((game) => (
                <Grid xs={6} sm={4} key={game.name}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      aspectRatio: "1/1",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "background.surface",
                        borderColor: colors.warning,
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <AspectRatio ratio="1" sx={{ width: "100%", borderRadius: "sm" }}>
                        {/* Using objectFit contain for logos */}
                        <img src={game.img} alt={game.name} style={{ objectFit: 'contain', padding: '5px' }} />
                    </AspectRatio>
                    <Typography level="body-xs" textAlign="center" fontWeight="bold">
                      {game.name}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Music Section */}
        <Grid xs={12} md={6}>
          <Card
            variant="soft"
            sx={{
              height: "100%",
              bgcolor: "rgba(0,0,0,0.2)",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <MusicNoteIcon sx={{ color: colors.error }} />
              <Typography level="h4">Music</Typography>
            </Box>

            <Typography level="body-md" sx={{ mb: 2, color: "text.secondary" }}>
              When I'm not coding, I play the guitar. Check out one of my recent covers!
            </Typography>

            {/* Video Container */}
            <AspectRatio ratio="16/9" sx={{ borderRadius: "lg", overflow: "hidden", bgcolor: "black" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Replace this Background with actual thumbnail if available
                  background: `linear-gradient(45deg, ${colors.dark}, #222)`,
                }}
              >
                {/* Simulated Video Player UI */}
                <IconButton
                  size="lg"
                  variant="solid"
                  color="danger"
                  sx={{ width: 64, height: 64, borderRadius: "50%" }}
                >
                  <PlayCircleFilledWhiteIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography 
                    level="body-xs" 
                    sx={{ position: "absolute", bottom: 10, color: "white", opacity: 0.7 }}
                >
                    Video Placeholder (Add iframe or video tag here)
                </Typography>
              </Box>
            </AspectRatio>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}