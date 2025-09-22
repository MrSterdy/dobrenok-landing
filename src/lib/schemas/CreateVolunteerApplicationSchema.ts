import { z } from "zod"

export const CreateVolunteerApplicationSchema = z.object({
    name: z.string().min(1, { message: "Имя является обязательным" }),
    age: z.string().min(1, { message: "Возраст является обязательным" }),
    phone: z.string().min(1, { message: "Телефон является обязательным" }),
    availability: z.string().min(1, { message: "Доступность является обязательным" }),
    hasCar: z.boolean().default(false),
    work: z.string().min(1, { message: "Работа является обязательным" }).array().min(1, { message: "Работа является обязательным" }),
})