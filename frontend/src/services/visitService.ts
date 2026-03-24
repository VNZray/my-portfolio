import supabase from "@/utils/supabase";

const TABLE = "page_visits";

export const visitService = {
    async trackVisit(page: string): Promise<void> {
        const { error } = await supabase
            .from(TABLE)
            .insert({ page });
        if (error) throw error;
    },

    async getTotalCount(): Promise<number> {
        const { count, error } = await supabase
            .from(TABLE)
            .select("*", { count: "exact", head: true });
        if (error) throw error;
        return count ?? 0;
    },
};
