-- ============================================
-- PORTFOLIO CMS - Supabase Tables & Policies
-- ============================================

-- 1. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    credential_url TEXT,
    image_url TEXT,
    description TEXT,
    skills TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    category TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date_achieved DATE,
    icon TEXT,
    image_url TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    logo_url TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INQUIRIES TABLE (Contact form submissions)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PAGE VISITS TABLE (Analytics)
CREATE TABLE IF NOT EXISTS page_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page TEXT NOT NULL,
    visited_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SOCIALS TABLE
CREATE TABLE IF NOT EXISTS socials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TECH STACK TABLE
CREATE TABLE IF NOT EXISTS tech_stack (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#000000',
    category TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

-- ADMIN UUID
-- 105dabc5-04e6-4cd0-a363-0173342806f9

-- CERTIFICATES POLICIES
CREATE POLICY "Public can view visible certificates"
    ON certificates FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on certificates"
    ON certificates FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- PROJECTS POLICIES
CREATE POLICY "Public can view visible projects"
    ON projects FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on projects"
    ON projects FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- ACHIEVEMENTS POLICIES
CREATE POLICY "Public can view visible achievements"
    ON achievements FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on achievements"
    ON achievements FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- EDUCATION POLICIES
CREATE POLICY "Public can view visible education"
    ON education FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on education"
    ON education FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- INQUIRIES POLICIES
CREATE POLICY "Anyone can insert inquiries"
    ON inquiries FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Admin can view and manage inquiries"
    ON inquiries FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- PAGE VISITS POLICIES
CREATE POLICY "Anyone can insert page visits"
    ON page_visits FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Admin can view page visits"
    ON page_visits FOR SELECT
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- SOCIALS POLICIES
CREATE POLICY "Public can view visible socials"
    ON socials FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on socials"
    ON socials FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- TECH STACK POLICIES
CREATE POLICY "Public can view visible tech_stack"
    ON tech_stack FOR SELECT
    USING (is_visible = TRUE);

CREATE POLICY "Admin can do everything on tech_stack"
    ON tech_stack FOR ALL
    USING (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9')
    WITH CHECK (auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9');

-- ============================================
-- STORAGE POLICIES (Bucket: File)
-- ============================================

-- Public can view files
CREATE POLICY "Public can view files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'File');

-- Admin can upload files
CREATE POLICY "Admin can upload files"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'File'
        AND auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9'
    );

-- Admin can update files
CREATE POLICY "Admin can update files"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'File'
        AND auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9'
    );

-- Admin can delete files
CREATE POLICY "Admin can delete files"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'File'
        AND auth.uid() = '105dabc5-04e6-4cd0-a363-0173342806f9'
    );

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_certificates
    BEFORE UPDATE ON certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_projects
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_achievements
    BEFORE UPDATE ON achievements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_education
    BEFORE UPDATE ON education
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_socials
    BEFORE UPDATE ON socials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_tech_stack
    BEFORE UPDATE ON tech_stack
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();