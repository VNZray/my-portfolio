import supabase from "@/utils/supabase";
import type { Education } from "@/types/User";

const TABLE = "education";

export const educationService = {
    async getAll(): Promise<Education[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getVisible(): Promise<Education[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("is_visible", true)
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Education | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(education: Omit<Education, "id" | "created_at" | "updated_at">): Promise<Education> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(education)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Education>): Promise<Education> {
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
