import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Tab,
  TabList,
  Tabs,
  tabClasses,
  Sheet,
  CircularProgress,
} from "@mui/joy";
import { colors } from "@/utils/Colors";
import { techStackService } from "@/services/techStackService";
import type { TechStack as TechStackType } from "@/types/User";

export default function TechStack() {
  const [items, setItems] = useState<TechStackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    techStackService
      .getVisible()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  // Group items by category dynamically
  const categories = useMemo(() => {
    const grouped: Record<string, TechStackType[]> = {};
    items.forEach((item) => {
      const cat = item.category || "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  }, [items]);

  const categoryNames = Object.keys(categories);

  return (
    <Card
      variant="soft"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        mt: 4,
        borderRadius: "xl",
        boxShadow: "lg",
      }}
    >
      <Typography level="h3" sx={{ mb: 2, color: "text.primary" }}>
        Tech <span style={{ color: colors.warning }}>Stack</span>
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : categoryNames.length === 0 ? (
        <Typography
          level="body-sm"
          sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
        >
          No tech stack items to display.
        </Typography>
      ) : (
        <>
          <Tabs
            aria-label="Tech Stack Tabs"
            value={selectedTab}
            onChange={(_event, newValue) => setSelectedTab(newValue as number)}
            sx={{ bgcolor: "transparent" }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 1,
                borderRadius: "lg",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface",
                  color: colors.warning,
                  fontWeight: "bold",
                },
              }}
            >
              {categoryNames.map((category) => (
                <Tab
                  key={category}
                  disableIndicator
                  sx={{ borderRadius: "md", flex: 1 }}
                >
                  {category}
                </Tab>
              ))}
            </TabList>
          </Tabs>

          <Box sx={{ mt: 3, minHeight: "200px" }}>
            <Grid container spacing={2}>
              {(categories[categoryNames[selectedTab]] ?? []).map(
                (item, index) => {
                  const isExternalUrl = item.icon.startsWith("http");
                  const iconSrc = isExternalUrl
                    ? item.icon
                    : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.icon}`;

                  return (
                    <Grid key={item.id} xs={6} sm={4} md={3}>
                      <Sheet
                        variant="outlined"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1.5,
                          p: 2,
                          borderRadius: "lg",
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          backgroundColor: "transparent",
                          animation: `popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s backwards`,
                          "&:hover": {
                            borderColor: item.color,
                            transform: "translateY(-5px)",
                            boxShadow: `0 5px 15px -5px ${item.color}40`,
                            bgcolor: "background.surface",
                          },
                          "@keyframes popIn": {
                            "0%": { opacity: 0, transform: "scale(0.8)" },
                            "100%": { opacity: 1, transform: "scale(1)" },
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={iconSrc}
                          alt={item.name}
                          sx={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                          }}
                        />
                        <Typography level="body-sm" fontWeight="md">
                          {item.name}
                        </Typography>
                      </Sheet>
                    </Grid>
                  );
                },
              )}
            </Grid>
          </Box>
        </>
      )}
    </Card>
  );
}
