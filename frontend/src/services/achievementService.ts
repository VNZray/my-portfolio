import supabase from "@/utils/supabase";
import type { Achievement } from "@/types/User";

const TABLE = "achievements";

export const achievementService = {
    async getAll(): Promise<Achievement[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getVisible(): Promise<Achievement[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("is_visible", true)
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Achievement | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(achievement: Omit<Achievement, "id" | "created_at" | "updated_at">): Promise<Achievement> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(achievement)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Achievement>): Promise<Achievement> {
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
