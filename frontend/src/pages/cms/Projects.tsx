import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Chip,
  ChipDelete,
  Box,
} from "@mui/joy";
import CmsTable from "./components/CmsTable";
import Loading from "@/components/Loading";
import { projectService } from "@/services/projectService";
import { isPdf, pdfEmbedUrl } from "@/utils/isPdf";
import type { Project } from "@/types/User";
import { storageService } from "@/services/storageService";

export default function ProjectsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [techInput, setTechInput] = useState("");

  const fetchData = useCallback(async () => {
    const items = await projectService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<Project>) => {
    if (item.id) {
      await projectService.update(item.id, item);
    } else {
      await projectService.create(
        item as Omit<Project, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await projectService.delete(id);
    await fetchData();
  };

  const handleImageUpload = async (
    file: File,
    onChange: (updates: Partial<Project>) => void,
  ) => {
    const url = await storageService.upload("projects", file);
    onChange({ image_url: url });
  };

  const addTech = (
    item: Partial<Project>,
    onChange: (updates: Partial<Project>) => void,
  ) => {
    const trimmed = techInput.trim();
    if (trimmed && !(item.tech_stack ?? []).includes(trimmed)) {
      onChange({ tech_stack: [...(item.tech_stack ?? []), trimmed] });
      setTechInput("");
    }
  };

  const removeTech = (
    item: Partial<Project>,
    onChange: (updates: Partial<Project>) => void,
    tech: string,
  ) => {
    onChange({
      tech_stack: (item.tech_stack ?? []).filter((t) => t !== tech),
    });
  };

  return (
    <CmsTable<Project>
      title="Projects"
      subtitle="Manage your portfolio projects"
      data={data}
      cardMedia={(row) =>
        row.image_url ? (
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
        ) : null
      }
      cardTag={(row) => row.category ?? null}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "is_featured", label: "Featured" },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{
        is_visible: true,
        is_featured: false,
        sort_order: 0,
        tech_stack: [],
      }}
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
            <FormLabel>Short Description</FormLabel>
            <Textarea
              minRows={2}
              value={item.description ?? ""}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Description</FormLabel>
            <Textarea
              minRows={3}
              value={item.long_description ?? ""}
              onChange={(e) => onChange({ long_description: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              value={item.category ?? ""}
              onChange={(e) => onChange({ category: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Live URL</FormLabel>
            <Input
              value={item.live_url ?? ""}
              onChange={(e) => onChange({ live_url: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>GitHub URL</FormLabel>
            <Input
              value={item.github_url ?? ""}
              onChange={(e) => onChange({ github_url: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tech Stack</FormLabel>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Input
                sx={{ flex: 1 }}
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech(item, onChange);
                  }
                }}
                placeholder="Type and press Enter"
              />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {(item.tech_stack ?? []).map((tech) => (
                <Chip
                  key={tech}
                  size="sm"
                  variant="soft"
                  endDecorator={
                    <ChipDelete
                      onDelete={() => removeTech(item, onChange, tech)}
                    />
                  }
                >
                  {tech}
                </Chip>
              ))}
            </Box>
          </FormControl>
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
            <FormLabel>Featured</FormLabel>
            <Switch
              checked={item.is_featured ?? false}
              onChange={(e) => onChange({ is_featured: e.target.checked })}
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
