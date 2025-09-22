export interface NewsPost {
    id: number;
    title: string;
    slug: string;
    sub_title?: string;
    body: string;
    status: string;
    published_at?: string;
    cover_photo_url: string;
    photo_alt_text: string;
    created_at: string;
    updated_at: string;
}

export interface NewsResponse {
    success: boolean;
    message: string;
    data: NewsPost[];
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

export interface SingleNewsResponse {
    success: boolean;
    message: string;
    data: NewsPost;
}
