export interface Employee {
    id: number;
    name: string;
    description?: string;
    group?: string;
    cover_photo_url: string;
    created_at: string;
    updated_at: string;
}

export interface EmployeesResponse {
    success: boolean;
    message: string;
    data: Employee[];
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

export interface GroupedEmployees {
    [group: string]: Employee[];
}
