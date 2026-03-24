export type Certificate = {
    id: string;
    title: string;
    issuer: string;
    issue_date: string | null;
    credential_url: string | null;
    image_url: string | null;
    description: string | null;
    skills: string[];
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
};

export type Project = {
    id: string;
    title: string;
    description: string | null;
    long_description: string | null;
    image_url: string | null;
    live_url: string | null;
    github_url: string | null;
    tech_stack: string[];
    category: string | null;
    is_featured: boolean;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Achievement = {
    id: string;
    title: string;
    description: string | null;
    date_achieved: string | null;
    icon: string | null;
    image_url: string | null;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Education = {
    id: string;
    institution: string;
    degree: string;
    field_of_study: string | null;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
    achievements: string[];
    logo_url: string | null;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Inquiry = {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
};

export type User = {
    email: string;
    password?: string;
    rememberMe?: boolean;
};

export type PageVisit = {
    id: string;
    page: string;
    visited_at: string;
};

export type Social = {
    id: string;
    platform: string;
    url: string;
    icon: string | null;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type TechStack = {
    id: string;
    name: string;
    icon: string;
    color: string;
    category: string;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
};