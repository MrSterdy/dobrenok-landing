export interface Project {
    id: number;
    name: string;
    description?: string;
    cover_photo_url?: string;
    home_url?: string;
    posts_count: number;
    created_at: string;
    updated_at: string;
}

export interface ProjectsResponse {
    success: boolean;
    message: string;
    data: Project[];
    meta?: {
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            next_page_url?: string;
            prev_page_url?: string;
        };
    };
}

export interface SingleProjectResponse {
    success: boolean;
    message: string;
    data: Project;
}
