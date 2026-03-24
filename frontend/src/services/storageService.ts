import supabase from "@/utils/supabase";

const BUCKET = "File";

export const storageService = {
    async upload(path: string, file: File): Promise<string> {
        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `${path}/${timestamp}-${sanitizedName}`;

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, file);
        if (error) throw error;

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        return data.publicUrl;
    },

    async delete(filePath: string): Promise<void> {
        // Extract path from full URL if needed
        const path = filePath.includes(BUCKET)
            ? filePath.split(`${BUCKET}/`)[1]
            : filePath;
        if (!path) return;

        const { error } = await supabase.storage.from(BUCKET).remove([path]);
        if (error) throw error;
    },

    getPublicUrl(filePath: string): string {
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        return data.publicUrl;
    },
};
