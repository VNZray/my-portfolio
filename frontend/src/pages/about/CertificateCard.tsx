import { Box, Typography, IconButton, AspectRatio, Chip } from "@mui/joy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@/components/Card";

export interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string; // URL to logo or certificate image
  link: string;
  skills: string[];
}

interface CertificateCardProps {
  certificate: CertificateData;
  index: number;
  orientation?: "horizontal" | "vertical";
}

export default function CertificateCard({
  certificate,
  index,
  orientation = "horizontal",
}: CertificateCardProps) {
  const isVertical = orientation === "vertical";

  return (
    <Card index={index} hoverable orientation={orientation}>
      {/* Certificate Image/Icon */}
      <AspectRatio
        ratio={isVertical ? "16/9" : "1"}
        sx={{
          width: isVertical ? "100%" : 80,
          minWidth: isVertical ? "auto" : 80,
          borderRadius: "md",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.surface",
          mb: isVertical ? 1 : 0,
        }}
      >
        <Box
          component="img"
          src={certificate.image}
          alt={certificate.issuer}
          sx={{ objectFit: "contain", p: isVertical ? 4 : 1 }}
        />
      </AspectRatio>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <Typography
            level="title-md"
            sx={{ lineHeight: 1.2, mb: 0.5, textAlign: "left" }}
          >
            {certificate.title}
          </Typography>
          <Typography
            level="body-sm"
            sx={{ color: "text.secondary", textAlign: "left" }}
          >
            {certificate.issuer} •{" "}
            <span style={{ opacity: 0.7 }}>{certificate.date}</span>
          </Typography>
        </Box>

        {/* Skills/Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mt: "auto",
          }}
        >
          {certificate.skills.map((skill) => (
            <Chip
              key={skill}
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{ fontSize: "0.7rem" }}
            >
              {skill}
            </Chip>
          ))}
        </Box>
      </Box>

      {/* Action Button */}
      <IconButton
        component="a"
        href={certificate.link}
        target="_blank"
        variant="plain"
        color="warning"
        sx={{
          position: isVertical ? "absolute" : "static",
          top: isVertical ? 12 : "auto",
          right: isVertical ? 12 : "auto",
          alignSelf: isVertical ? "auto" : "start",
          bgcolor: isVertical ? "background.surface" : "transparent",
          border: isVertical ? "1px solid" : "none",
          borderColor: "divider",
          transition: "transform 0.2s",
          "&:hover": { transform: "rotate(45deg)" },
        }}
      >
        <OpenInNewIcon />
      </IconButton>
    </Card>
  );
}
