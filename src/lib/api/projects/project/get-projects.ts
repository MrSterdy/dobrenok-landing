import { API_BASE_URL } from "@/lib/consts/api";
import { ProjectsResponse } from "@/lib/types/project";

interface GetProjectsParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: 'id' | 'name' | 'created_at' | 'updated_at';
    sort_direction?: 'asc' | 'desc';
}

export async function getProjects(params: GetProjectsParams = {}): Promise<ProjectsResponse> {
    const url = new URL('/api/v1/projects', API_BASE_URL);

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
