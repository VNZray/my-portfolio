// Card.tsx

import { Card as JoyCard, type CardProps as JoyCardProps } from "@mui/joy";
import { colors } from "@/utils/Colors";

interface CustomCardProps extends JoyCardProps {
  index?: number; // For staggered animation delay
  hoverable?: boolean; // Enable/disable hover effects
  orientation?: "horizontal" | "vertical";
}

export default function Card({
  children,
  index = 0,
  hoverable = true,
  orientation = "horizontal",

  sx,
  ...props
}: CustomCardProps) {
  const isVertical = orientation === "vertical";

  return (
    <JoyCard
      variant="soft"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: isVertical ? "stretch" : "center",
        textAlign: isVertical ? "center" : "left",
        gap: 2,
        p: 2,
        bgcolor: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: colors.error,
          bgcolor: "rgba(255, 255, 255, 0.05)",
          boxShadow: `0 10px 30px -10px ${colors.error}20`,
        },
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
      {...props}
    >
      {children}
    </JoyCard>
  );
}
