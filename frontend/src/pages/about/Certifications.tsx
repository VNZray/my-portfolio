import { useState } from "react";
import { Box, Typography, Grid, IconButton, Stack } from "@mui/joy";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { colors } from "../../utils/Colors";
import CertificateCard, { type CertificateData } from "./CertificateCard";

const CERTIFICATES: CertificateData[] = [
  {
    id: "1",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    date: "Aug 2024",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    link: "https://coursera.org",
    skills: ["React", "UI/UX", "JavaScript"],
  },
  {
    id: "2",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2025",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    link: "https://aws.amazon.com/certification/",
    skills: ["Cloud Computing", "Security", "AWS Services"],
  },
  {
    id: "3",
    title: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Dec 2023",
    image:
      "https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg",
    link: "https://www.freecodecamp.org/",
    skills: ["Algorithms", "Data Structures", "ES6"],
  },
  {
    id: "4",
    title: "Complete React Developer (w/ Redux, Hooks, GraphQL)",
    issuer: "Udemy",
    date: "Nov 2023",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    link: "https://www.udemy.com/",
    skills: ["React", "Redux", "GraphQL"],
  },
];

export default function Certifications() {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <Box sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography level="h3" sx={{ color: "text.primary" }}>
          Licenses & Certifications {" "}
          <span style={{ color: colors.warning }}>Demo</span>
        </Typography>

        {/* View Toggle */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.05)",
            p: 0.5,
            borderRadius: "md",
            backdropFilter: "blur(8px)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconButton
            size="sm"
            variant={isGridView ? "solid" : "plain"}
            color={isGridView ? "warning" : "neutral"}
            onClick={() => setIsGridView(true)}
            sx={{ transition: "all 0.2s" }}
            aria-label="Grid View"
          >
            <GridViewIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant={!isGridView ? "solid" : "plain"}
            color={!isGridView ? "warning" : "neutral"}
            onClick={() => setIsGridView(false)}
            sx={{ transition: "all 0.2s" }}
            aria-label="List View"
          >
            <ViewListIcon />
          </IconButton>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        {CERTIFICATES.map((cert, index) => (
          <Grid
            key={cert.id}
            xs={12}
            md={isGridView ? 3 : 12}
            lg={isGridView ? 3 : 12}
            xl={isGridView ? 3 : 6}
          >
            <CertificateCard
              certificate={cert}
              index={index}
              orientation={isGridView ? "vertical" : "horizontal"}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
