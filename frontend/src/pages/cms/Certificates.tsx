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
import { certificateService } from "@/services/certificateService";
import { isPdf, pdfEmbedUrl } from "@/utils/isPdf";
import type { Certificate } from "@/types/User";
import { storageService } from "@/services/storageService";

export default function CertificatesPage() {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillInput, setSkillInput] = useState("");

  const fetchData = useCallback(async () => {
    const items = await certificateService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<Certificate>) => {
    if (item.id) {
      await certificateService.update(item.id, item);
    } else {
      await certificateService.create(
        item as Omit<Certificate, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await certificateService.delete(id);
    await fetchData();
  };

  const handleImageUpload = async (
    file: File,
    onChange: (updates: Partial<Certificate>) => void,
  ) => {
    const url = await storageService.upload("certificates", file);
    onChange({ image_url: url });
  };

  const addSkill = (
    item: Partial<Certificate>,
    onChange: (updates: Partial<Certificate>) => void,
  ) => {
    const trimmed = skillInput.trim();
    if (trimmed && !(item.skills ?? []).includes(trimmed)) {
      onChange({ skills: [...(item.skills ?? []), trimmed] });
      setSkillInput("");
    }
  };

  const removeSkill = (
    item: Partial<Certificate>,
    onChange: (updates: Partial<Certificate>) => void,
    skill: string,
  ) => {
    onChange({
      skills: (item.skills ?? []).filter((s) => s !== skill),
    });
  };

  if (loading) return <Loading />;

  return (
    <CmsTable<Certificate>
      title="Certificates"
      subtitle="Manage your certifications and credentials"
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
      cardTag={(row) => row.issuer ?? null}
      cardDate={(row) => row.issue_date ?? null}
      columns={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "issue_date", label: "Date" },
        { key: "skills", label: "Skills" },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{ is_visible: true, sort_order: 0, skills: [] }}
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
          <FormControl required>
            <FormLabel>Issuer</FormLabel>
            <Input
              value={item.issuer ?? ""}
              onChange={(e) => onChange({ issuer: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Issue Date</FormLabel>
            <Input
              type="date"
              value={item.issue_date ?? ""}
              onChange={(e) => onChange({ issue_date: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Credential URL</FormLabel>
            <Input
              value={item.credential_url ?? ""}
              onChange={(e) => onChange({ credential_url: e.target.value })}
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
            <FormLabel>Skills / Tags</FormLabel>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Input
                sx={{ flex: 1 }}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(item, onChange);
                  }
                }}
                placeholder="Type a skill and press Enter"
              />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {(item.skills ?? []).map((skill) => (
                <Chip
                  key={skill}
                  size="sm"
                  variant="soft"
                  endDecorator={
                    <ChipDelete
                      onDelete={() => removeSkill(item, onChange, skill)}
                    />
                  }
                >
                  {skill}
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
