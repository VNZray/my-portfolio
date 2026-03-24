import { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/joy";
import { colors } from "@/utils/Colors";
import { achievementService } from "@/services/achievementService";
import { ICON_MAP } from "@/pages/cms/components/IconSelect";
import type { Achievement as AchievementType } from "@/types/User";

export default function Achievements() {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementService
      .getVisible()
      .then(setAchievements)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements.length === 0) return null;

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", position: "relative" }}>
      <Typography level="h3" sx={{ mb: 4, textAlign: "center" }}>
        <span style={{ color: colors.warning }}>Major</span> Achievements
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <>
          {/* Vertical Line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: "20px", md: "50%" },
              top: "60px",
              bottom: "20px",
              width: "2px",
              bgcolor: "divider",
              transform: { md: "translateX(-50%)" },
              zIndex: 0,
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {achievements.map((item, index) => {
              const isEven = index % 2 === 0;
              const icon = item.icon ? ICON_MAP[item.icon] : null;
              const formattedDate = item.date_achieved
                ? new Date(item.date_achieved).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : null;

              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  {/* Dot on Timeline */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: "12px", md: "50%" },
                      top: { xs: "0", md: "50%" },
                      transform: { md: "translate(-50%, -50%)" },
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      bgcolor: colors.warning,
                      boxShadow: `0 0 10px ${colors.warning}`,
                      zIndex: 2,
                      mt: { xs: 0.5, md: 0 },
                    }}
                  />

                  {/* Date Label (Desktop Only - Alternating) */}
                  {formattedDate && (
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: isEven ? "right" : "left",
                        ml: isEven ? { md: 4 } : 4,
                        mr: isEven ? 4 : { md: 4 },
                        display: { xs: "none", md: "block" },
                        order: isEven ? 1 : 3,
                      }}
                    >
                      <Typography level="title-md" textColor="text.secondary">
                        {formattedDate}
                      </Typography>
                    </Box>
                  )}

                  {/* Card Content */}
                  <Box
                    sx={{
                      flex: 1,
                      pl: { xs: 5, md: isEven ? 0 : 4 },
                      pr: { xs: 0, md: isEven ? 4 : 0 },
                      width: "100%",
                      order: isEven ? 3 : 1,
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.02)",
                        backdropFilter: "blur(8px)",
                        borderColor: "divider",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          borderColor: colors.warning,
                          boxShadow: `0 4px 20px ${colors.warning}20`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        {icon && (
                          <Box sx={{ color: colors.warning }}>{icon}</Box>
                        )}
                        <Typography level="title-lg">{item.title}</Typography>
                      </Box>

                      {/* Date shown inside card on Mobile */}
                      {formattedDate && (
                        <Typography
                          level="body-sm"
                          textColor="text.tertiary"
                          sx={{ display: { md: "none" }, mb: 1 }}
                        >
                          {formattedDate}
                        </Typography>
                      )}

                      <Typography level="body-sm" textColor="text.secondary">
                        {item.description}
                      </Typography>
                    </Card>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}
