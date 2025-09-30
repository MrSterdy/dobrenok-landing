export interface Payment {
    id: number;
    external_payment_id: string;
    status: string;
    amount: number;
    currency: string;
    project_id: number;
    payment_url?: string;
    finished_at?: string;
    created_at: string;
    updated_at: string;
}
