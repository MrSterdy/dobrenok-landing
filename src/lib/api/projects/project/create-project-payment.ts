import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { Payment } from "@/lib/types/payment";

export interface CreateProjectPaymentRequest {
    amount: number;
    currency: string;
    description: string;
    customer_email?: string;
    customer_phone?: string;
    success_url?: string;
    fail_url?: string;
    payment_provider: 'tbank';
}

export interface ProjectPaymentResponse {
    success: boolean;
    message: string;
    data: Payment;
}

export async function createProjectPayment(paymentData: CreateProjectPaymentRequest): Promise<ProjectPaymentResponse> {
    const url = new URL(`/api/v1/projects/${API_PROJECT_ID}/payments`, API_BASE_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    return data;
}
