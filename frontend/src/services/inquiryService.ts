import supabase from "@/utils/supabase";
import type { Inquiry } from "@/types/User";

const TABLE = "inquiries";

export const inquiryService = {
    async getAll(): Promise<Inquiry[]> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data ?? [];
    },

    async getById(id: string): Promise<Inquiry | null> {
        const { data, error } = await supabase
            .from(TABLE)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(inquiry: Pick<Inquiry, "name" | "email" | "subject" | "message">): Promise<Inquiry> {
        const { data, error } = await supabase
            .from(TABLE)
            .insert(inquiry)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async markAsRead(id: string): Promise<void> {
        const { error } = await supabase
            .from(TABLE)
            .update({ is_read: true })
            .eq("id", id);
        if (error) throw error;
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase.from(TABLE).delete().eq("id", id);
        if (error) throw error;
    },

    async getUnreadCount(): Promise<number> {
        const { count, error } = await supabase
            .from(TABLE)
            .select("*", { count: "exact", head: true })
            .eq("is_read", false);
        if (error) throw error;
        return count ?? 0;
    },
};
