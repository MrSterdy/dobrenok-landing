export interface ProjectPaymentGoal {
    id: number;
    target_amount: number;
    current_amount: number;
    currency: string;
    description?: string;
    deadline?: string;
    progress_percentage: number;
    remaining_amount: number;
    is_goal_reached: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    cover_photo_url?: string;
    home_url?: string;
    posts_count: number;
    payment_goal?: ProjectPaymentGoal;
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
