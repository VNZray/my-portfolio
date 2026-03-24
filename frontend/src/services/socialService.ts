import supabase from "@/utils/supabase";
import type { Social } from "@/types/User";

const TABLE = "socials";

export const socialService = {
    async getAll(): Promise<Social[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getVisible(): Promise<Social[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("is_visible", true)
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Social | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(social: Omit<Social, "id" | "created_at" | "updated_at">): Promise<Social> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(social)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Social>): Promise<Social> {
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
