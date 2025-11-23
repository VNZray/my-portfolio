import { Box } from "@mui/joy";

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
        height: { xs: "auto", md: "93vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
