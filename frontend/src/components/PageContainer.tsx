import { Box } from "@mui/joy";
import { BackgroundElements } from "./ui/BackgroundElements";

type Props = {
  children: React.ReactNode;
  sx?: object;
  gap?: number;
};

const PageContainer = ({ children, sx, gap = 2 }: Props) => {
  return (
    <Box
      gap={gap}
      sx={{
        height: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        paddingY: { xs: 2, md: 4 },
        ...sx,
      }}
    >
      {/* Reusable Background Component */}
      <BackgroundElements />
      {children}
    </Box>
  );
};

export default PageContainer;
