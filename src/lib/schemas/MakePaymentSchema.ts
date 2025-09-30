import z from "zod";

export const MakePaymentSchema = z.object({
    amount: z.coerce.number().min(10, { message: "Сумма не может составлять меньше 10₽" }),
    monthly: z.boolean().default(false),
    email: z.email({ error: () => "Email должен быть корректным" }).optional(),
    name: z.string().optional(),
}).refine((data) => {
    return data.monthly ? !!data.email : true
}, {
    message: "Email обязателен для ежемесячных платежей",
    path: ["email"],
})