import { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  Sheet,
  Chip,
  Tooltip,
  Grid,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  ListItemDecorator,
  useColorScheme,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImageIcon from "@mui/icons-material/Image";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import BaseModal from "@/components/ui/BaseModal";
import NoDataFound from "@/components/NoDataFound";
import { getColors } from "@/utils/Colors";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface CmsTableProps<T extends { id: string }> {
  title: string;
  subtitle?: string;
  data: T[];
  columns: Column<T>[];
  formContent: (
    item: Partial<T>,
    onChange: (updates: Partial<T>) => void,
  ) => React.ReactNode;
  onSave: (item: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  defaultValues?: Partial<T>;
  cardMedia?: (row: T) => React.ReactNode;
  cardTag?: (row: T) => string | null;
  cardDate?: (row: T) => string | null;
  cardLayout?: "grid" | "list";
  cardSubtitle?: (row: T) => string | null;
}

export default function CmsTable<T extends { id: string }>({
  title,
  subtitle,
  data,
  columns,
  formContent,
  onSave,
  onDelete,
  defaultValues = {},
  cardMedia,
  cardTag,
  cardDate,
  cardLayout = "grid",
  cardSubtitle,
}: CmsTableProps<T>) {
  const { mode } = useColorScheme();
  const colors = getColors(mode);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<T>>(defaultValues);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;
  const [viewMode, setViewMode] = useState<"table" | "card">(
    isMobile ? "card" : "table",
  );

  const handleAdd = () => {
    setEditItem(defaultValues);
    setModalOpen(true);
  };

  const handleEdit = (item: T) => {
    setEditItem({ ...item });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(editItem);
      setModalOpen(false);
      setEditItem(defaultValues);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
    setDeleteConfirm(null);
  };

  const getValue = (row: T, key: string): unknown => {
    return (row as Record<string, unknown>)[key];
  };

  return (
    <Box sx={{ animation: "fadeInUp 0.6s ease-out backwards" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1.5, sm: 0 },
          mb: 3,
        }}
      >
        <Box>
          <Typography.Header size="md">{title}</Typography.Header>
          {subtitle && (
            <Typography.Body size="sm" color="error">
              {subtitle}
            </Typography.Body>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Tooltip title="Table view">
              <IconButton
                size="sm"
                variant={viewMode === "table" ? "solid" : "plain"}
                color={viewMode === "table" ? "primary" : "neutral"}
                onClick={() => setViewMode("table")}
                sx={{ borderRadius: 0 }}
              >
                <ViewListIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Card view">
              <IconButton
                size="sm"
                variant={viewMode === "card" ? "solid" : "plain"}
                color={viewMode === "card" ? "primary" : "neutral"}
                onClick={() => setViewMode("card")}
                sx={{ borderRadius: 0 }}
              >
                <GridViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Button
            colorScheme="error"
            startDecorator={<AddIcon />}
            onClick={handleAdd}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            Add {title.replace(/s$/, "")}
          </Button>
        </Box>
      </Box>

      {/* Floating Add Button (mobile) */}
      <IconButton
        variant="solid"
        color="danger"
        onClick={handleAdd}
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 900,
          width: 56,
          height: 56,
          borderRadius: "50%",
          boxShadow: `0 6px 20px ${colors.error}50`,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: `0 8px 28px ${colors.error}70`,
          },
        }}
      >
        <AddIcon sx={{ fontSize: 28 }} />
      </IconButton>

      {/* Data Display */}
      {data.length === 0 ? (
        <Sheet
          variant="plain"
          sx={{
            borderRadius: "12px",
            overflow: "auto",
            bgcolor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <NoDataFound
            title={`No ${title} yet`}
            message={`Click "Add" to create your first ${title.replace(/s$/, "").toLowerCase()}.`}
            icon="inbox"
            size="small"
          />
        </Sheet>
      ) : viewMode === "table" ? (
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
                {columns.map((col) => (
                  <th key={String(col.key)}>{col.label}</th>
                ))}
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`,
                  }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render
                        ? col.render(row)
                        : renderCellValue(getValue(row, String(col.key)))}
                    </td>
                  ))}
                  <td>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="sm"
                          variant="soft"
                          color="primary"
                          onClick={() => handleEdit(row)}
                          sx={{
                            borderRadius: "8px",
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="sm"
                          variant="soft"
                          color="danger"
                          onClick={() => setDeleteConfirm(row.id)}
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
              ))}
            </tbody>
          </Table>
        </Sheet>
      ) : cardLayout === "list" ? (
        <Grid container spacing={2}>
          {data.map((row, index) => {
            const firstCol = columns[0];
            const firstValue = firstCol?.render
              ? firstCol.render(row)
              : String(getValue(row, String(firstCol?.key)) ?? "");
            const subValue = cardSubtitle?.(row);
            const tag = cardTag?.(row);
            const date = cardDate?.(row);

            return (
              <Grid key={row.id} xs={12} sm={6} md={4}>
                <Sheet
                  variant="plain"
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `fadeInUp 0.4s ease-out ${index * 0.03}s backwards`,
                    "&:hover": {
                      borderColor: `${colors.error}50`,
                      boxShadow: `0 8px 24px -6px ${colors.error}15`,
                    },
                  }}
                >
                  {/* Left: Media */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {cardMedia ? (
                      cardMedia(row) || (
                        <ImageIcon sx={{ fontSize: 32, opacity: 0.2 }} />
                      )
                    ) : (
                      <ImageIcon sx={{ fontSize: 32, opacity: 0.2 }} />
                    )}
                  </Box>

                  {/* Right: Text + kebab menu */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      px: 2,
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.25,
                      }}
                    >
                      <Typography.CardTitle size="md" bold>
                        {firstValue}
                      </Typography.CardTitle>
                      {subValue && (
                        <Typography.Body
                          size="sm"
                          sx={{
                            opacity: 0.6,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {subValue}
                        </Typography.Body>
                      )}
                      {(tag || date) && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          {tag && (
                            <Chip
                              size="sm"
                              variant="soft"
                              color="primary"
                              sx={{ borderRadius: "6px" }}
                            >
                              {tag}
                            </Chip>
                          )}
                          {date && (
                            <Typography.Body size="sm" sx={{ opacity: 0.5 }}>
                              {date}
                            </Typography.Body>
                          )}
                        </Box>
                      )}
                    </Box>

                    {/* 3-dots menu */}
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: {
                            size: "sm",
                            variant: "plain",
                            sx: {
                              borderRadius: "50%",
                              flexShrink: 0,
                              color: "text.secondary",
                              "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.15)",
                              },
                            },
                          },
                        }}
                      >
                        <MoreVertIcon sx={{ fontSize: 18 }} />
                      </MenuButton>
                      <Menu
                        placement="bottom-end"
                        size="sm"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem onClick={() => handleEdit(row)}>
                          <ListItemDecorator>
                            <EditIcon fontSize="small" />
                          </ListItemDecorator>
                          Edit
                        </MenuItem>
                        <MenuItem
                          color="danger"
                          onClick={() => setDeleteConfirm(row.id)}
                        >
                          <ListItemDecorator>
                            <DeleteIcon fontSize="small" />
                          </ListItemDecorator>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </Box>
                </Sheet>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {data.map((row, index) => {
            const firstCol = columns[0];
            const firstValue = firstCol?.render
              ? firstCol.render(row)
              : String(getValue(row, String(firstCol?.key)) ?? "");
            const tag = cardTag?.(row);
            const date = cardDate?.(row);

            return (
              <Grid key={row.id} xs={12} sm={6} md={4}>
                <Sheet
                  variant="plain"
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s backwards`,
                    "&:hover": {
                      borderColor: `${colors.error}50`,
                      boxShadow: `0 12px 32px -8px ${colors.error}20`,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Card Media with kebab menu */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 200, sm: 320 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${colors.error}10, ${colors.error}05)`,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {cardMedia ? (
                      cardMedia(row) || (
                        <ImageIcon sx={{ fontSize: 180, opacity: 0.2 }} />
                      )
                    ) : (
                      <ImageIcon sx={{ fontSize: 180, opacity: 0.2 }} />
                    )}

                    {/* 3-dots menu */}
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: {
                            size: "sm",
                            variant: "soft",
                            sx: {
                              position: "absolute",
                              top: 8,
                              right: 8,
                              borderRadius: "50%",
                              bgcolor: "rgba(0, 0, 0, 0.5)",
                              color: "#fff",
                              backdropFilter: "blur(4px)",
                              "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.7)",
                              },
                            },
                          },
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </MenuButton>
                      <Menu
                        placement="bottom-end"
                        size="sm"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem onClick={() => handleEdit(row)}>
                          <ListItemDecorator>
                            <EditIcon fontSize="small" />
                          </ListItemDecorator>
                          Edit
                        </MenuItem>
                        <MenuItem
                          color="danger"
                          onClick={() => setDeleteConfirm(row.id)}
                        >
                          <ListItemDecorator>
                            <DeleteIcon fontSize="small" />
                          </ListItemDecorator>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </Box>

                  {/* Card Footer: Title + optional tag & date */}
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography.CardTitle size="md" bold>
                      {firstValue}
                    </Typography.CardTitle>

                    {(tag || date) && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        {tag && (
                          <Chip
                            size="sm"
                            variant="soft"
                            color="primary"
                            sx={{ borderRadius: "6px" }}
                          >
                            {tag}
                          </Chip>
                        )}
                        {date && (
                          <Typography.Body
                            size="sm"
                            sx={{ opacity: 0.6, ml: "auto" }}
                          >
                            {date}
                          </Typography.Body>
                        )}
                      </Box>
                    )}
                  </Box>
                </Sheet>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Add/Edit Modal */}
      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${(editItem as { id?: string }).id ? "Edit" : "Add"} ${title.replace(/s$/, "")}`}
        size="sm"
        actions={[
          {
            label: "Cancel",
            onClick: () => setModalOpen(false),
            variant: "outlined",
            colorScheme: "primary",
          },
          {
            label: saving ? "Saving..." : "Save",
            onClick: handleSave,
            colorScheme: "error",
            disabled: saving,
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          {formContent(editItem, (updates) =>
            setEditItem((prev) => ({ ...prev, ...updates })),
          )}
        </Box>
      </BaseModal>

      {/* Delete Confirmation Modal */}
      <BaseModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Delete"
        size="sm"
        showCloseButton={false}
        headerContent={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 1,
            }}
          >
            <Box
              sx={{
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
            <Typography.Header size="sm" bold>
              Confirm Delete
            </Typography.Header>
          </Box>
        }
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
        footerAlign="center"
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography.Body size="sm">
            Are you sure you want to delete this item? This cannot be undone.
          </Typography.Body>
        </Box>
      </BaseModal>

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

function renderCellValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean")
    return (
      <Chip
        size="sm"
        variant="soft"
        color={value ? "success" : "neutral"}
        sx={{ borderRadius: "6px" }}
      >
        {value ? "Yes" : "No"}
      </Chip>
    );
  if (Array.isArray(value))
    return value.map((v, i) => (
      <Chip
        key={i}
        size="sm"
        variant="soft"
        sx={{
          mr: 0.5,
          mb: 0.5,
          borderRadius: "6px",
        }}
      >
        {String(v)}
      </Chip>
    ));
  const str = String(value);
  return str.length > 60 ? str.slice(0, 60) + "…" : str;
}
