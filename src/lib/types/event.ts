export interface Event {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    body: string;
    cover_photo_url: string;
    start_date: string;
    created_at: string;
    updated_at: string;
}

export interface EventsResponse {
    success: boolean;
    message: string;
    data: Event[];
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
