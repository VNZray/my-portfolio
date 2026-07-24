import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Sheet,
  Table,
  Tooltip,
  Divider,
  useColorScheme,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InboxIcon from "@mui/icons-material/Inbox";
import Typography from "@/components/ui/Typography";
import BaseModal from "@/components/ui/BaseModal";
import NoDataFound from "@/components/NoDataFound";
import Loading from "@/components/Loading";
import { inquiryService } from "@/services/inquiryService";
import { getColors } from "@/utils/Colors";
import type { Inquiry } from "@/types/User";

export default function InquiriesPage() {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const [data, setData] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<Inquiry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const items = await inquiryService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleView = async (item: Inquiry) => {
    setViewItem(item);
    if (!item.is_read) {
      await inquiryService.markAsRead(item.id);
      await fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await inquiryService.delete(id);
    setDeleteConfirm(null);
    await fetchData();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const unreadCount = data.filter((d) => !d.is_read).length;

  return (
    <Box sx={{ animation: "fadeInUp 0.6s ease-out backwards" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography.Header size="md">Inquiries</Typography.Header>
            {unreadCount > 0 && (
              <Chip
                size="sm"
                variant="soft"
                color="danger"
                sx={{ borderRadius: "6px", fontWeight: 700 }}
              >
                {unreadCount} new
              </Chip>
            )}
          </Box>
          <Typography.Body size="sm" color="error">
            Messages from your portfolio visitors
          </Typography.Body>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: "10px",
            bgcolor: `${colors.secondary}15`,
          }}
        >
          <InboxIcon sx={{ color: colors.secondary, fontSize: 20 }} />
          <Typography.Label size="sm">{data.length} total</Typography.Label>
        </Box>
      </Box>

      {/* Glassmorphism Table Wrapper */}
      <Sheet
        variant="plain"
        sx={{
          borderRadius: "12px",
          overflow: "auto",
          bgcolor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: `${colors.error}40`,
            boxShadow: `0 4px 20px -8px ${colors.error}15`,
          },
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            "& thead th": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderBottom: "1px solid",
              borderColor: "divider",
              py: 1.5,
            },
            "& tbody tr": {
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
              "&:hover": {
                bgcolor: `${colors.error}08`,
              },
            },
            "& tbody td": {
              borderBottom: "1px solid",
              borderColor: "rgba(255,255,255,0.05)",
              py: 1.5,
            },
          }}
        >
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th style={{ width: 100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <NoDataFound
                    title="No inquiries yet"
                    message="Messages from your portfolio visitors will appear here."
                    icon="inbox"
                    size="small"
                  />
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    fontWeight: item.is_read ? "normal" : "bold",
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`,
                  }}
                  onClick={() => handleView(item)}
                >
                  <td>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={item.is_read ? "neutral" : "danger"}
                      sx={{ borderRadius: "6px" }}
                    >
                      {item.is_read ? "Read" : "New"}
                    </Chip>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject || "—"}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td>
                    <Box
                      sx={{ display: "flex", gap: 0.5 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="View">
                        <IconButton
                          size="sm"
                          variant="soft"
                          color="primary"
                          onClick={() => handleView(item)}
                          sx={{
                            borderRadius: "8px",
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="sm"
                          variant="soft"
                          color="danger"
                          onClick={() => setDeleteConfirm(item.id)}
                          sx={{
                            borderRadius: "8px",
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Sheet>

      {/* View Modal */}
      <BaseModal
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        size="sm"
        showCloseButton
        headerContent={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: `${colors.secondary}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MarkEmailReadIcon
                sx={{ color: colors.secondary, fontSize: 20 }}
              />
            </Box>
            <Typography.CardTitle>
              Message from {viewItem?.name}
            </Typography.CardTitle>
          </Box>
        }
      >
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          <Box>
            <Typography.Label size="sm" color="secondary">
              Email
            </Typography.Label>
            <Typography.Body>{viewItem?.email}</Typography.Body>
          </Box>
          {viewItem?.subject && (
            <Box>
              <Typography.Label size="sm" color="secondary">
                Subject
              </Typography.Label>
              <Typography.Body>{viewItem.subject}</Typography.Body>
            </Box>
          )}
          <Box>
            <Typography.Label size="sm" color="secondary">
              Message
            </Typography.Label>
            <Box
              sx={{
                mt: 0.5,
                p: 2,
                borderRadius: "10px",
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography.Body>{viewItem?.message}</Typography.Body>
            </Box>
          </Box>
          <Box>
            <Typography.Label size="sm" color="secondary">
              Received
            </Typography.Label>
            <Typography.Body>
              {viewItem?.created_at && formatDate(viewItem.created_at)}
            </Typography.Body>
          </Box>
        </Box>
      </BaseModal>

      {/* Delete Confirmation */}
      <BaseModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        size="sm"
        headerContent={
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Box
              sx={{
                mx: "auto",
                mb: 2,
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: `${colors.error}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberIcon sx={{ color: colors.error, fontSize: 28 }} />
            </Box>
            <Typography.CardTitle>Confirm Delete</Typography.CardTitle>
          </Box>
        }
        description="Are you sure you want to delete this inquiry?"
        footerAlign="center"
        actions={[
          {
            label: "Cancel",
            onClick: () => setDeleteConfirm(null),
            variant: "outlined",
            colorScheme: "primary",
          },
          {
            label: "Delete",
            onClick: () => deleteConfirm && handleDelete(deleteConfirm),
            colorScheme: "error",
          },
        ]}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}
