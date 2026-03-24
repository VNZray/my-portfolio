import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Alert,
  Sheet,
} from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { inquiryService } from "@/services/inquiryService";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      await inquiryService.create(form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 600,
          p: { xs: 3, md: 4 },
          borderRadius: "lg",
        }}
      >
        <Typography.Header size="md">Get In Touch</Typography.Header>
        <Typography.Body size="sm" color="warning">
          Have a question or want to work together? Send me a message!
        </Typography.Body>

        {success && (
          <Alert
            color="success"
            variant="soft"
            startDecorator={<CheckCircleIcon />}
            sx={{ mt: 2 }}
          >
            Message sent successfully! I'll get back to you soon.
          </Alert>
        )}

        {error && (
          <Alert color="danger" variant="soft" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your full name"
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="What is this about?"
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Message</FormLabel>
            <Textarea
              minRows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell me about your project or question..."
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="warning"
            loading={sending}
            startDecorator={<SendIcon />}
          >
            Send Message
          </Button>
        </Box>
      </Sheet>
    </Box>
  );
}
