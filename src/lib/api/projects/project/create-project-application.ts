import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api"

interface CreatProjectApplicationParams {
    name: string
    data: Record<string, any>
}

export async function createProjectApplication(params: CreatProjectApplicationParams) {
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/applications`, API_BASE_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })

    const data = await response.json();
    return data;
}