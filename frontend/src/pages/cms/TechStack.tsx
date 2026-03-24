import { useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Option,
} from "@mui/joy";
import CmsTable from "./components/CmsTable";
import Loading from "@/components/Loading";
import { techStackService } from "@/services/techStackService";
import type { TechStack } from "@/types/User";

const CATEGORY_OPTIONS = [
  "Languages",
  "Frameworks",
  "Databases",
  "Tools",
  "Other",
];

export default function TechStackPage() {
  const [data, setData] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const items = await techStackService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<TechStack>) => {
    if (item.id) {
      await techStackService.update(item.id, item);
    } else {
      await techStackService.create(
        item as Omit<TechStack, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await techStackService.delete(id);
    await fetchData();
  };

  if (loading) return <Loading />;

  return (
    <CmsTable<TechStack>
      title="Tech Stack"
      subtitle="Manage your technology stack"
      data={data}
      cardMedia={(row) =>
        row.icon ? (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${row.icon}`}
            alt={row.name}
            style={{
              maxWidth: "64px",
              maxHeight: "64px",
              objectFit: "contain",
            }}
          />
        ) : null
      }
      cardTag={(row) => row.category ?? null}
      cardLayout="list"
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        {
          key: "color",
          label: "Color",
          render: (row) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "4px",
                  bgcolor: row.color,
                  border: "1px solid",
                  borderColor: "divider",
                  flexShrink: 0,
                }}
              />
              {row.color}
            </Box>
          ),
        },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{ is_visible: true, sort_order: 0, color: "#000000" }}
      onSave={handleSave}
      onDelete={handleDelete}
      formContent={(item, onChange) => (
        <>
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input
              value={item.name ?? ""}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. React, TypeScript"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>Category</FormLabel>
            <Select
              value={item.category ?? ""}
              onChange={(_e, value) => onChange({ category: value ?? "" })}
              placeholder="Select a category"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <FormLabel>Icon Path</FormLabel>
            <Input
              value={item.icon ?? ""}
              onChange={(e) => onChange({ icon: e.target.value })}
              placeholder="e.g. react/react-original.svg"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>Brand Color</FormLabel>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Input
                type="color"
                value={item.color ?? "#000000"}
                onChange={(e) => onChange({ color: e.target.value })}
                sx={{ width: 56, p: 0.5 }}
              />
              <Input
                value={item.color ?? "#000000"}
                onChange={(e) => onChange({ color: e.target.value })}
                placeholder="#000000"
                sx={{ flex: 1 }}
              />
            </Box>
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
