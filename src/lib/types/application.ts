export interface Application {
    id: number;
    name: string;
    project_id: number;
    data: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface CreateApplicationRequest {
    name: string;
    data: Record<string, any>;
}

export interface ApplicationResponse {
    success: boolean;
    message: string;
    data: Application;
}
