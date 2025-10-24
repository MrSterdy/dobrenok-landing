import { z } from "zod";

export const ProjectPaymentSchema = z.object({
    amount: z.coerce.number().min(10, { message: "Сумма не может составлять меньше 10₽" }),
    email: z.string().email().optional().or(z.literal('')),
    name: z.string().optional(),
});
