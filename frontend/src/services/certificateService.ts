import supabase from "@/utils/supabase";
import type { Certificate } from "@/types/User";

const TABLE = "certificates";

export const certificateService = {
    async getAll(): Promise<Certificate[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getVisible(): Promise<Certificate[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("is_visible", true)
            .order("sort_order", { ascending: true });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Certificate | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(certificate: Omit<Certificate, "id" | "created_at" | "updated_at">): Promise<Certificate> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(certificate)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id: string, updates: Partial<Certificate>): Promise<Certificate> {
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
