import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
} from "@mui/joy";
import CmsTable from "./components/CmsTable";
import Loading from "@/components/Loading";
import { educationService } from "@/services/educationService";
import type { Education } from "@/types/User";
import { storageService } from "@/services/storageService";

export default function EducationPage() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [achievementInput, setAchievementInput] = useState("");

  const fetchData = useCallback(async () => {
    const items = await educationService.getAll();
    setData(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (item: Partial<Education>) => {
    if (item.id) {
      await educationService.update(item.id, item);
    } else {
      await educationService.create(
        item as Omit<Education, "id" | "created_at" | "updated_at">,
      );
    }
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await educationService.delete(id);
    await fetchData();
  };

  const handleLogoUpload = async (
    file: File,
    onChange: (updates: Partial<Education>) => void,
  ) => {
    const url = await storageService.upload("education", file);
    onChange({ logo_url: url });
  };

  const addAchievement = (
    item: Partial<Education>,
    onChange: (updates: Partial<Education>) => void,
  ) => {
    const trimmed = achievementInput.trim();
    if (trimmed && !(item.achievements ?? []).includes(trimmed)) {
      onChange({ achievements: [...(item.achievements ?? []), trimmed] });
      setAchievementInput("");
    }
  };

  const removeAchievement = (
    item: Partial<Education>,
    onChange: (updates: Partial<Education>) => void,
    achievement: string,
  ) => {
    onChange({
      achievements: (item.achievements ?? []).filter((a) => a !== achievement),
    });
  };

  return (
    <CmsTable<Education>
      title="Education"
      subtitle="Manage your educational journey"
      data={data}
      cardMedia={(row) =>
        row.logo_url ? (
          <img
            src={row.logo_url}
            alt={row.institution}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              objectFit: "contain",
            }}
          />
        ) : null
      }
      cardTag={(row) => row.degree ?? null}
      cardLayout="list"
      columns={[
        { key: "institution", label: "Institution" },
        { key: "degree", label: "Degree" },
        { key: "field_of_study", label: "Field" },
        { key: "is_current", label: "Current" },
        { key: "achievements", label: "Achievements" },
        { key: "is_visible", label: "Visible" },
      ]}
      defaultValues={{
        is_visible: true,
        is_current: false,
        sort_order: 0,
        achievements: [],
      }}
      onSave={handleSave}
      onDelete={handleDelete}
      formContent={(item, onChange) => (
        <>
          <FormControl required>
            <FormLabel>Institution</FormLabel>
            <Input
              value={item.institution ?? ""}
              onChange={(e) => onChange({ institution: e.target.value })}
            />
          </FormControl>
          <FormControl required>
            <FormLabel>Degree</FormLabel>
            <Input
              value={item.degree ?? ""}
              onChange={(e) => onChange({ degree: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Field of Study</FormLabel>
            <Input
              value={item.field_of_study ?? ""}
              onChange={(e) => onChange({ field_of_study: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              value={item.start_date ?? ""}
              onChange={(e) => onChange({ start_date: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              value={item.end_date ?? ""}
              onChange={(e) => onChange({ end_date: e.target.value })}
              disabled={item.is_current}
            />
          </FormControl>
          <FormControl
            orientation="horizontal"
            sx={{ justifyContent: "space-between" }}
          >
            <FormLabel>Currently Studying</FormLabel>
            <Switch
              checked={item.is_current ?? false}
              onChange={(e) =>
                onChange({
                  is_current: e.target.checked,
                  end_date: e.target.checked ? null : item.end_date,
                })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Achievements & Honors</FormLabel>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Input
                sx={{ flex: 1 }}
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAchievement(item, onChange);
                  }
                }}
                placeholder="Type an achievement and press Enter"
              />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {(item.achievements ?? []).map((ach) => (
                <Chip
                  key={ach}
                  size="sm"
                  variant="soft"
                  endDecorator={
                    <ChipDelete
                      onDelete={() => removeAchievement(item, onChange, ach)}
                    />
                  }
                >
                  {ach}
                </Chip>
              ))}
            </Box>
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
            <FormLabel>Logo / PDF</FormLabel>
            <Input
              type="file"
              slotProps={{ input: { accept: "image/*,.pdf,application/pdf" } }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file, onChange);
              }}
            />
            {item.logo_url && (
              <img
                src={item.logo_url}
                alt="Preview"
                style={{ maxWidth: 200, marginTop: 8, borderRadius: 8 }}
              />
            )}
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
