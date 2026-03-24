import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Alert,
  Typography as JoyTypography,
  useColorScheme,
} from "@mui/joy";
import { Code } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { BackgroundElements } from "@/components/ui/BackgroundElements";
import { getColors } from "@/utils/Colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mode } = useColorScheme();
  const colors = getColors(mode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/cms");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: mode === "dark" ? "background.surface" : "#F5FBFF",
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundElements />

      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: "16px",
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)",
          animation: "fadeInUp 0.6s ease-out",
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: `${colors.error}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code sx={{ color: colors.error }} />
          </Box>
          <JoyTypography level="h4">
            vnz.<span style={{ color: colors.error }}>dev</span>
          </JoyTypography>
        </Box>

        <Typography.Header size="sm">CMS Login</Typography.Header>
        <Typography.Body size="sm" color="secondary">
          Portfolio Management System
        </Typography.Body>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {error && (
            <Alert color="danger" variant="soft">
              {error}
            </Alert>
          )}

          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="primary"
            loading={loading}
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
