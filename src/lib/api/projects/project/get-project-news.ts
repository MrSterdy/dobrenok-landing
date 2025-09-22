import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { NewsResponse } from "@/lib/types/news";

interface GetProjectNewsParams {
    page?: number;
    per_page?: number;
    search?: string;
    category_id?: number;
    tag_id?: number;
    status?: 'published' | 'pending' | 'scheduled';
    sort_by?: 'id' | 'title' | 'published_at' | 'created_at' | 'updated_at';
    sort_direction?: 'asc' | 'desc';
}

export async function getProjectNews(params: GetProjectNewsParams): Promise<NewsResponse> {
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/posts`, API_BASE_URL);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, value.toString());
            }
        });
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}
