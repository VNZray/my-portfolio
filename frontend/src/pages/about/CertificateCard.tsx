import { Box, Typography, IconButton, AspectRatio, Chip } from "@mui/joy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Card from "@/components/Card";
import { isPdf, pdfEmbedUrl } from "@/utils/isPdf";
import type { Certificate } from "@/types/User";

interface CertificateCardProps {
  certificate: Certificate;
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
      {certificate.image_url && (
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
          {isPdf(certificate.image_url) ? (
            <Box
              component="iframe"
              src={pdfEmbedUrl(certificate.image_url)}
              title={certificate.title}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
            />
          ) : (
            <Box
              component="img"
              src={certificate.image_url}
              alt={certificate.issuer}
              sx={{ objectFit: "contain", p: isVertical ? 4 : 1 }}
            />
          )}
        </AspectRatio>
      )}

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
            {certificate.issuer}
            {certificate.issue_date && (
              <>
                {" "}
                •{" "}
                <span style={{ opacity: 0.7 }}>
                  {new Date(certificate.issue_date).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric" },
                  )}
                </span>
              </>
            )}
          </Typography>
        </Box>

        {/* Skills/Tags */}
        {certificate.skills.length > 0 && (
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
        )}
      </Box>

      {/* Action Button */}
      {certificate.credential_url && (
        <IconButton
          component="a"
          href={certificate.credential_url}
          target="_blank"
          rel="noopener noreferrer"
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
      )}
    </Card>
  );
}
