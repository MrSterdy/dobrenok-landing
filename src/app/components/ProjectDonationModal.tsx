'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectPaymentSchema } from "@/lib/schemas/ProjectPaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProjectPaymentById } from "@/lib/api/projects/project/create-project-payment-by-id";
import { toast } from "sonner";
import { Project } from "@/lib/types/project";

interface ProjectDonationModalProps {
    project: Project;
    children: React.ReactNode;
}

export function ProjectDonationModal({ project, children }: ProjectDonationModalProps) {
    const paymentForm = useForm({
        resolver: zodResolver(ProjectPaymentSchema),
        defaultValues: {
            amount: 10,
            email: '',
            name: '',
        },
    })

    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSubmit = paymentForm.handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

            const paymentData = {
                amount: data.amount,
                currency: 'RUB',
                description: `Пожертвование для проекта "${project.name}"`,
                customer_email: data.email,
                success_url: `${currentUrl}/?payment=success`,
                fail_url: `${currentUrl}/?payment=failed`,
                payment_provider: 'tbank' as const,
            };

            const response = await createProjectPaymentById(project.id, paymentData);

            if (response.success && response.data.payment_url) {
                toast.success('Платеж создан! Перенаправляем на оплату...');
                setDialogOpen(false);
                paymentForm.reset({
                    amount: 10,
                    email: '',
                    name: '',
                });
                window.location.assign(response.data.payment_url);
            } else {
                toast.error('Ошибка при создании платежа');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Произошла ошибка при обработке платежа');
        } finally {
            setIsLoading(false);
        }
    })

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Пожертвование для проекта "{project.name}"</DialogTitle>
                    <DialogDescription>Выберите сумму для пожертвования. Спасибо за поддержку!</DialogDescription>
                </DialogHeader>
                <Form {...paymentForm}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={paymentForm.control}
                            name="amount"
                            render={({ field: { value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Сумма</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={value as number}
                                            type="number"
                                            className="shadow-none"
                                            placeholder="Укажите сумму..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={paymentForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email (необязательно)</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="shadow-none" placeholder="your@email.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={paymentForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя (необязательно)</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="shadow-none" placeholder="Ваше имя" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" size="lg" className="cursor-pointer shadow-none">
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button
                        variant="green"
                        size="lg"
                        className="cursor-pointer shadow-none"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Обработка...' : 'Пожертвовать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
