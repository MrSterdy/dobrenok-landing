import { API_BASE_URL } from "@/lib/consts/api";
import { Payment } from "@/lib/types/payment";

export interface CreateProjectPaymentByIdRequest {
    amount: number;
    currency: string;
    description: string;
    customer_email?: string;
    customer_phone?: string;
    success_url?: string;
    fail_url?: string;
    payment_provider: 'tbank';
}

export interface ProjectPaymentByIdResponse {
    success: boolean;
    message: string;
    data: Payment;
}

export async function createProjectPaymentById(projectId: number, paymentData: CreateProjectPaymentByIdRequest): Promise<ProjectPaymentByIdResponse> {
    const url = new URL(`/api/v1/projects/${projectId}/payments`, API_BASE_URL);

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
