import React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Option,
  Box,
} from "@mui/joy";
import CmsTable from "./components/CmsTable";
import Loading from "@/components/Loading";
import { socialService } from "@/services/socialService";
import type { Social } from "@/types/User";
import { ICON_MAP } from "./components/IconSelect";

const PLATFORM_OPTIONS = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "GitHub",
  "Twitter",
  "YouTube",
  "TikTok",
  "Discord",
  "Dribbble",
  "Behance",
];

export default function SocialsPage() {
  const [data, setData] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const items = await socialService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<Social>) => {
    if (item.id) {
      await socialService.update(item.id, item);
    } else {
      await socialService.create(
        item as Omit<Social, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await socialService.delete(id);
    await fetchData();
  };

  if (loading) return <Loading />;

  return (
    <CmsTable<Social>
      title="Socials"
      subtitle="Manage your social media links"
      data={data}
      cardMedia={(row) => {
        const key = row.icon || row.platform;
        const icon = key ? ICON_MAP[key] : null;
        if (icon && React.isValidElement(icon)) {
          return React.cloneElement(
            icon as React.ReactElement<{ sx?: object }>,
            {
              sx: { fontSize: 36, color: "text.secondary" },
            },
          );
        }
        return null;
      }}
      cardTag={(row) => row.platform ?? null}
      cardLayout="list"
      cardSubtitle={(row) => row.url ?? null}
      columns={[
        { key: "platform", label: "Platform" },
        { key: "url", label: "URL" },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{ is_visible: true, sort_order: 0 }}
      onSave={handleSave}
      onDelete={handleDelete}
      formContent={(item, onChange) => (
        <>
          <FormControl required>
            <FormLabel>Platform</FormLabel>
            <Select
              value={item.platform ?? ""}
              onChange={(_e, value) => {
                const platform = value ?? "";
                onChange({ platform, icon: platform });
              }}
              placeholder="Select a platform"
              renderValue={(selected) => {
                const icon = ICON_MAP[selected?.value as string];
                return icon ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {icon}
                    {selected?.value}
                  </Box>
                ) : null;
              }}
            >
              {PLATFORM_OPTIONS.map((p) => (
                <Option key={p} value={p}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {ICON_MAP[p] ?? null}
                    {p}
                  </Box>
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <FormLabel>URL</FormLabel>
            <Input
              value={item.url ?? ""}
              onChange={(e) => onChange({ url: e.target.value })}
              placeholder="https://..."
            />
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
