import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/joy";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { colors } from "../../utils/Colors";
import CertificateCard from "./CertificateCard";
import { certificateService } from "@/services/certificateService";
import type { Certificate } from "@/types/User";

export default function Certifications() {
  const [isGridView, setIsGridView] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificateService
      .getVisible()
      .then(setCertificates)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && certificates.length === 0) return null;

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
          Licenses &{" "}
          <span style={{ color: colors.warning }}> Certifications</span>
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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {certificates.map((cert, index) => (
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
      )}
    </Box>
  );
}
