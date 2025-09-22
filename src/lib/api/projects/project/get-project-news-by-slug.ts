import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { SingleNewsResponse } from "@/lib/types/news";

interface GetProjectNewsBySlugParams {
    slug: string;
}

export async function getProjectNewsBySlug(params: GetProjectNewsBySlugParams): Promise<SingleNewsResponse> {
    const { slug } = params;
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/posts/${slug}`, API_BASE_URL);
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
