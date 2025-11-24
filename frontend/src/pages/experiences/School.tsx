import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemDecorator,
  Avatar,
  Chip,
  Stack,
} from "@mui/joy";
import { colors } from "@/utils/Colors";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star"; // For achievements

interface SchoolData {
  id: string;
  name: string;
  level: string;
  year: string;
  course?: string;
  logo: string; // URL to logo
  achievements: string[];
}

// Mock Data
const SCHOOLS: SchoolData[] = [
  {
    id: "college",
    name: "University of Nueva Caceres",
    level: "College",
    year: "2022 - 2026",
    course: "BS Information Technology",
    logo: "https://unc.edu.ph/wp-content/uploads/2025/05/cropped-UNC-Logo-White-Text-300x105-1.png-2.png", // Valid placeholder or UNC logo if public
    achievements: [
      "Dean's Lister: 1st Year (1st & 2nd Sem)",
      "Dean's Lister: 2nd Year (2nd Sem)",
      "Dean's Lister: 3rd Year (1st Sem)",
      "4th Year (Ongoing)",
    ],
  },
  {
    id: "shs",
    name: "United High School Inc.",
    level: "Senior High School",
    year: "2020 - 2022",
    logo: "https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/294627968_421426513336554_1926960724096936888_n.jpg?_nc_cat=103&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VrQ8OIXji_8Q7kNvwE45USk&_nc_oc=Adm_KmgpP-CiK3-xtdIUEw1u4RO0Lc3lR-TNg6F8BhUu7aMPWRxyTiBRmWiY-HZgHHFG38dMyL78vhd1RRbBYAh9&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=e3jx5JRd9i_p6WaMgxmctg&oh=00_Afj4wT7DWHjWzmPI430L0_255D7TAe24nHWAFxe0toeRYA&oe=6929DAFB", // Generic placeholder
    achievements: ["Graduated with Honors"],
  },
  {
    id: "jhs",
    name: "United High School Inc.",
    level: "High School",
    year: "2016 - 2020",
    logo: "https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/294627968_421426513336554_1926960724096936888_n.jpg?_nc_cat=103&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VrQ8OIXji_8Q7kNvwE45USk&_nc_oc=Adm_KmgpP-CiK3-xtdIUEw1u4RO0Lc3lR-TNg6F8BhUu7aMPWRxyTiBRmWiY-HZgHHFG38dMyL78vhd1RRbBYAh9&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=e3jx5JRd9i_p6WaMgxmctg&oh=00_Afj4wT7DWHjWzmPI430L0_255D7TAe24nHWAFxe0toeRYA&oe=6929DAFB", // Generic placeholder
    achievements: [],
  },
  {
    id: "elem",
    name: "Paniman Elementary School",
    level: "Elementary",
    year: "2010 - 2016",
    logo: "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/221791667_375550887470844_2147235010779996371_n.jpg?_nc_cat=104&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=N_GJroDt3_8Q7kNvwEVvMiV&_nc_oc=AdlUQwNCXA_sZT3KeF_DFRKLg56q9k8oRYg8DftDGyrvT9tdD3ayz-UNuDdMZ2mVkhNL8Won1iZwdiGdqjQHTHA-&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=S0YWI2PzC6vLm22bd9e6Og&oh=00_Afh-buSkTQX79GGlguec7ZJ3ZdzX252kyZ2Zd9VvUm4Q_w&oe=6929D86D", // Generic placeholder
    achievements: ["Honor Student (Grade 1-5)"],
  },
];

export default function School() {
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 8 }}>
      <Typography level="h3" sx={{ mb: 4, textAlign: "center" }}>
        Educational <span style={{ color: colors.error }}>Journey</span>
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Spine Line */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            bottom: 20,
            left: { xs: "32px", sm: "40px" },
            width: "3px",
            background: `linear-gradient(to bottom, ${colors.warning}, ${colors.error})`,
            zIndex: 0,
            opacity: 0.3,
          }}
        />

        {SCHOOLS.map((school) => (
          <Box
            key={school.id}
            sx={{
              display: "flex",
              gap: 3,
              mb: 4,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Logo Wrapper */}
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: "64px", sm: "80px" },
                height: { xs: "64px", sm: "80px" },
                borderRadius: "50%",
                bgcolor: "background.surface",
                border: "2px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "lg",
                ml: { xs: 0, sm: 0 },
              }}
            >
              <Avatar
                src={school.logo}
                alt={school.name}
                sx={{ width: "70%", height: "70%", bgcolor: "transparent" }}
                variant="plain"
              >
                <SchoolIcon />
              </Avatar>
            </Box>

            {/* Content Card */}
            <Card
              variant="soft"
              sx={{
                flexGrow: 1,
                bgcolor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: colors.error,
                  transform: "translateX(5px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box>
                  <Typography level="title-lg">{school.name}</Typography>
                  <Typography level="body-md" color="warning">
                    {school.level} {school.course && `• ${school.course}`}
                  </Typography>
                </Box>
                <Box>
                  <Chip variant="outlined" color="neutral" size="md">
                    {school.year}
                  </Chip>
                </Box>
              </Box>

              {/* Achievements List */}
              {school.achievements.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    bgcolor: "background.level1",
                    p: 1.5,
                    borderRadius: "md",
                  }}
                >
                  <Typography level="title-sm" sx={{ mb: 1, opacity: 0.8 }}>
                    Achievements & Honors
                  </Typography>
                  <List size="sm" sx={{ p: 0 }}>
                    {school.achievements.map((ach) => (
                      <ListItem key={ach} sx={{ minHeight: "24px" }}>
                        <ListItemDecorator sx={{ color: colors.warning }}>
                          <StarIcon fontSize="small" />
                        </ListItemDecorator>
                        <Typography level="body-sm">{ach}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
