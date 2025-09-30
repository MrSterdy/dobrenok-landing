import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { Subscription } from "@/lib/types/subscription";

export interface CreateProjectSubscriptionRequest {
    email: string;
    name?: string;
    amount: number;
    currency: string;
    description: string;
    success_url?: string;
    fail_url?: string;
    payment_provider: 'tbank';
}

export interface ProjectSubscriptionResponse {
    success: boolean;
    message: string;
    data: Subscription;
}

export async function createProjectSubscription(subscriptionData: CreateProjectSubscriptionRequest): Promise<ProjectSubscriptionResponse> {
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/subscriptions`, API_BASE_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
    });

    const data = await response.json();
    return data;
}
