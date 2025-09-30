export interface Subscription {
    id: number;
    email: string;
    name?: string;
    amount: number;
    currency: string;
    status: string;
    external_subscription_id?: string;
    project_id: number;
    payment_url?: string;
    next_billing_date?: string;
    cancelled_at?: string;
    created_at: string;
    updated_at: string;
}
