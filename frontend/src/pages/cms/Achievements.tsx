import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Textarea, Switch } from "@mui/joy";
import CmsTable from "./components/CmsTable";
import IconSelect, { ICON_MAP } from "./components/IconSelect";
import Loading from "@/components/Loading";
import { achievementService } from "@/services/achievementService";
import { isPdf, pdfEmbedUrl } from "@/utils/isPdf";
import type { Achievement } from "@/types/User";
import { storageService } from "@/services/storageService";

export default function AchievementsPage() {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const items = await achievementService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<Achievement>) => {
    if (item.id) {
      await achievementService.update(item.id, item);
    } else {
      await achievementService.create(
        item as Omit<Achievement, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await achievementService.delete(id);
    await fetchData();
  };

  const handleImageUpload = async (
    file: File,
    onChange: (updates: Partial<Achievement>) => void,
  ) => {
    const url = await storageService.upload("achievements", file);
    onChange({ image_url: url });
  };

  if (loading) return <Loading />;

  return (
    <CmsTable<Achievement>
      title="Achievements"
      subtitle="Manage your awards and accomplishments"
      data={data}
      cardMedia={(row) => {
        const icon = row.icon ? ICON_MAP[row.icon] : null;
        if (icon && React.isValidElement(icon)) {
          return React.cloneElement(
            icon as React.ReactElement<{ sx?: object }>,
            {
              sx: { fontSize: 48, color: "text.secondary" },
            },
          );
        }
        return row.image_url ? (
          isPdf(row.image_url) ? (
            <iframe
              src={pdfEmbedUrl(row.image_url)}
              title={row.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                pointerEvents: "none",
              }}
            />
          ) : (
            <img
              src={row.image_url}
              alt={row.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )
        ) : null;
      }}
      cardDate={(row) => row.date_achieved ?? null}
      cardLayout="list"
      columns={[
        { key: "title", label: "Title" },
        { key: "date_achieved", label: "Date" },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{ is_visible: true, sort_order: 0 }}
      onSave={handleSave}
      onDelete={handleDelete}
      formContent={(item, onChange) => (
        <>
          <FormControl required>
            <FormLabel>Title</FormLabel>
            <Input
              value={item.title ?? ""}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              minRows={2}
              value={item.description ?? ""}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date Achieved</FormLabel>
            <Input
              type="date"
              value={item.date_achieved ?? ""}
              onChange={(e) => onChange({ date_achieved: e.target.value })}
            />
          </FormControl>
          <IconSelect
            label="Icon"
            value={item.icon ?? null}
            onChange={(value) => onChange({ icon: value })}
            category="achievement"
            placeholder="Select an icon"
          />
          <FormControl>
            <FormLabel>Image / PDF</FormLabel>
            <Input
              type="file"
              slotProps={{ input: { accept: "image/*,.pdf,application/pdf" } }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, onChange);
              }}
            />
            {item.image_url &&
              (isPdf(item.image_url) ? (
                <iframe
                  src={pdfEmbedUrl(item.image_url)}
                  title="Preview"
                  style={{
                    width: "100%",
                    height: 250,
                    marginTop: 8,
                    borderRadius: 8,
                    border: "none",
                  }}
                />
              ) : (
                <img
                  src={item.image_url}
                  alt="Preview"
                  style={{ maxWidth: 200, marginTop: 8, borderRadius: 8 }}
                />
              ))}
          </FormControl>
          <FormControl>
            <FormLabel>Sort Order</FormLabel>
            <Input
              type="number"
              value={item.sort_order ?? 0}
              onChange={(e) =>
                onChange({ sort_order: parseInt(e.target.value) || 0 })
              }
            />
          </FormControl>
          <FormControl
            orientation="horizontal"
            sx={{ justifyContent: "space-between" }}
          >
            <FormLabel>Visible</FormLabel>
            <Switch
              checked={item.is_visible ?? true}
              onChange={(e) => onChange({ is_visible: e.target.checked })}
            />
          </FormControl>
        </>
      )}
    />
  );
}
