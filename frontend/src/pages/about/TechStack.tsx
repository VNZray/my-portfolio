import { useState } from "react";
import { Box, Card, Typography, Grid, Tab, TabList, Tabs, tabClasses, Sheet } from "@mui/joy";
import { colors } from "@/utils/Colors";

type Category = "Languages" | "Frameworks" | "Databases";

interface TechItem {
  name: string;
  icon: string;
  color: string; // Brand color for hover effect
}

const TECH_DATA: Record<Category, TechItem[]> = {
  Languages: [
    { name: "Java", icon: "java/java-original.svg", color: "#E76F00" },
    { name: "JavaScript", icon: "javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "TypeScript", icon: "typescript/typescript-original.svg", color: "#3178C6" },
    { name: "HTML5", icon: "html5/html5-original.svg", color: "#E34F26" },
    { name: "CSS3", icon: "css3/css3-original.svg", color: "#1572B6" },
    { name: "PHP", icon: "php/php-original.svg", color: "#777BB4" },
  ],
  Frameworks: [
    { name: "React", icon: "react/react-original.svg", color: "#61DAFB" },
    { name: "React Native", icon: "react/react-original.svg", color: "#61DAFB" },
    { name: "Vue.js", icon: "vuejs/vuejs-original.svg", color: "#4FC08D" },
    { name: "Laravel", icon: "laravel/laravel-original.svg", color: "#FF2D20" },
    { name: "Spring Boot", icon: "spring/spring-original.svg", color: "#6DB33F" },
    { name: "Node.js", icon: "nodejs/nodejs-original.svg", color: "#339933" },
    // Expo often uses a simple icon, using a fallback or specific path
    { name: "Expo", icon: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg", color: "#000020" }, 
  ],
  Databases: [
    { name: "MySQL", icon: "mysql/mysql-original.svg", color: "#4479A1" },
    { name: "MariaDB", icon: "mariadb/mariadb-original.svg", color: "#003545" },
  ],
};

export default function TechStack() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const categories = Object.keys(TECH_DATA) as Category[];

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
          {categories.map((category) => (
            <Tab key={category} disableIndicator sx={{ borderRadius: "md", flex: 1 }}>
              {category}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Box sx={{ mt: 3, minHeight: "200px" }}>
        <Grid container spacing={2}>
          {TECH_DATA[categories[selectedTab]].map((item, index) => (
            <Grid key={item.name} xs={6} sm={4} md={3}>
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
                  src={item.name === "Expo" ? item.icon : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.icon}`}
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
          ))}
        </Grid>
      </Box>
    </Card>
  );
}