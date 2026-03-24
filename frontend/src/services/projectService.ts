import supabase from "@/utils/supabase";
import type { Project } from "@/types/User";

const TABLE = "projects";

export const projectService = {
    async getAll(): Promise<Project[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getVisible(): Promise<Project[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("is_visible", true)
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Project | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(project)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Project>): Promise<Project> {
        const { data, error } = await supabase
            .from(TABLE)
            .update(updates)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase.from(TABLE).delete().eq("id", id);
        if (error) throw error;
    },
};
