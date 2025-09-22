export interface Partner {
    id: number;
    name: string;
    description?: string;
    cover_photo_url: string;
    created_at: string;
    updated_at: string;
}

export interface PartnersResponse {
    success: boolean;
    message: string;
    data: Partner[];
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
