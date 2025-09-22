import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { PartnersResponse } from "@/lib/types/partner";

interface GetProjectPartnersParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: 'id' | 'name' | 'created_at' | 'updated_at';
    sort_direction?: 'asc' | 'desc';
}

export async function getProjectPartners(params: GetProjectPartnersParams = {}): Promise<PartnersResponse> {
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/partners`, API_BASE_URL);

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
