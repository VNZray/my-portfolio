import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemDecorator,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/joy";
import { colors } from "@/utils/Colors";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import { educationService } from "@/services/educationService";
import type { Education } from "@/types/User";

export default function School() {
  const [schools, setSchools] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    educationService
      .getVisible()
      .then(setSchools)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && schools.length === 0) return null;

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 8 }}>
      <Typography level="h3" sx={{ mb: 4, textAlign: "center" }}>
        Educational <span style={{ color: colors.error }}>Journey</span>
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
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

          {schools.map((school) => {
            const yearRange = [
              school.start_date
                ? new Date(school.start_date).getFullYear()
                : null,
              school.is_current
                ? "Present"
                : school.end_date
                  ? new Date(school.end_date).getFullYear()
                  : null,
            ]
              .filter(Boolean)
              .join(" - ");

            return (
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
                  }}
                >
                  <Avatar
                    src={school.logo_url ?? undefined}
                    alt={school.institution}
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
                      <Typography level="title-lg">
                        {school.institution}
                      </Typography>
                      <Typography level="body-md" color="warning">
                        {school.degree}
                        {school.field_of_study && ` • ${school.field_of_study}`}
                      </Typography>
                    </Box>
                    {yearRange && (
                      <Box>
                        <Chip variant="outlined" color="neutral" size="md">
                          {yearRange}
                        </Chip>
                      </Box>
                    )}
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
            );
          })}
        </Box>
      )}
    </Box>
  );
}
