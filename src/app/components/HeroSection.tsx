'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MakePaymentSchema } from "@/lib/schemas/MakePaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createProjectPayment } from "@/lib/api/projects/project/create-project-payment";
import { createProjectSubscription } from "@/lib/api/projects/project/create-project-subscription";
import { toast } from "sonner";

export function HeroSection() {
    const paymentForm = useForm({
        resolver: zodResolver(MakePaymentSchema),
        defaultValues: {
            amount: 10,
            monthly: true,
        },
    })

    const [selectedAmount, setSelectedAmount] = useState<number | 'other' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAmountClick = (amount: number | 'other') => {
        setSelectedAmount(amount);
        if (amount !== 'other') {
            paymentForm.setValue('amount', amount);
            paymentForm.trigger('amount');
        }
    }

    const handleSubmit = paymentForm.handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const isMonthly = data.monthly;
            const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

            if (isMonthly) {
                // Create subscription
                if (!data.email) {
                    toast.error('Email обязателен для ежемесячных платежей');
                    return;
                }

                const subscriptionData = {
                    email: data.email,
                    name: data.name,
                    amount: data.amount,
                    currency: 'RUB',
                    description: 'Ежемесячная поддержка проекта',
                    success_url: `${currentUrl}/?payment=success`,
                    fail_url: `${currentUrl}/?payment=failed`,
                    payment_provider: 'tbank' as const,
                };

                const response = await createProjectSubscription(subscriptionData);

                if (response.success && response.data.payment_url) {
                    window.open(response.data.payment_url, '_blank');
                    toast.success('Подписка создана! Перенаправляем на оплату...');
                    setDialogOpen(false);
                    paymentForm.reset({
                        amount: 0,
                        monthly: false,
                        email: '',
                        name: '',
                    });
                    setSelectedAmount(null);
                } else {
                    toast.error('Ошибка при создании подписки');
                }
            } else {
                // Create one-time payment
                const paymentData = {
                    amount: data.amount,
                    currency: 'RUB',
                    description: 'Разовое пожертвование',
                    customer_email: data.email,
                    success_url: `${currentUrl}/?payment=success`,
                    fail_url: `${currentUrl}/?payment=failed`,
                    payment_provider: 'tbank' as const,
                };

                const response = await createProjectPayment(paymentData);

                if (response.success && response.data.payment_url) {
                    window.open(response.data.payment_url, '_blank');
                    toast.success('Платеж создан! Перенаправляем на оплату...');
                    setDialogOpen(false);
                    paymentForm.reset({
                        amount: 0,
                        monthly: false,
                        email: '',
                        name: '',
                    });
                    setSelectedAmount(null);
                } else {
                    toast.error('Ошибка при создании платежа');
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Произошла ошибка при обработке платежа');
        } finally {
            setIsLoading(false);
        }
    })

    return (
        <section className="flex flex-col mx-auto max-w-screen-xl w-full px-6">
            <div className="relative rounded-xl overflow-hidden pb-88 pt-12">
                <div className="flex flex-col items-center">
                    <h1 className="lowercase text-center text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-benzin text-balance text-white">Фонд <br /> Добрый Ребёнок</h1>
                    <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-balance max-w-[420px] mt-6 text-white">Поддерживаем воспитательные и образовательные проекты</p>
                    <Button size="lg" className="text-base sm:text-lg md:text-xl h-10 md:h-14 font-normal rounded-full cursor-pointer shadow-none px-14 md:px-18 lg:px-22 mt-6" variant="yellow">
                        <img src="/assets/images/heart.png" className="size-8 xl:size-10" />
                        Подробнее о фонде
                    </Button>
                </div>
                <img src="/assets/images/background.jpg" className="absolute inset-0 w-full h-full object-cover -z-10" />
            </div>
            <div className="px-4 md:px-6 py-4 md:py-6 pb-2 md:pb-4 bg-white shadow-md rounded-md md:rounded-xl mx-6 flex flex-col -translate-y-1/2">
                <div className="flex flex-col md:flex-row md:justify-between flex-wrap gap-2 md:gap-4">
                    <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 flex-wrap">
                        <Button
                            size="lg"
                            variant={selectedAmount === 250 ? 'green' : 'secondary'}
                            className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8"
                            onClick={() => handleAmountClick(250)}
                        >
                            250₽
                        </Button>
                        <Button
                            size="lg"
                            variant={selectedAmount === 500 ? 'green' : 'secondary'}
                            className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8"
                            onClick={() => handleAmountClick(500)}
                        >
                            500₽
                        </Button>
                        <Button
                            size="lg"
                            variant={selectedAmount === 750 ? 'green' : 'secondary'}
                            className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8"
                            onClick={() => handleAmountClick(750)}
                        >
                            750₽
                        </Button>
                        <Button
                            size="lg"
                            variant={selectedAmount === 1000 ? 'green' : 'secondary'}
                            className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8"
                            onClick={() => handleAmountClick(1000)}
                        >
                            1000₽
                        </Button>
                        <Button
                            size="lg"
                            variant={selectedAmount === 'other' ? 'green' : 'secondary'}
                            className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8 col-span-2 md:col-span-1"
                            onClick={() => handleAmountClick('other')}
                        >
                            Другая сумма
                        </Button>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                variant="blue"
                                className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8"
                                disabled={selectedAmount === null}
                            >
                                Я хочу помочь
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Пожертвование</DialogTitle>
                                <DialogDescription>Выберите сумму для пожертвования. Спасибо!</DialogDescription>
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
                                                <FormLabel>Email {!paymentForm.watch('monthly') && '(необязательно)'}</FormLabel>
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
                                    <FormField
                                        control={paymentForm.control}
                                        name="monthly"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            className="shadow-none cursor-pointer"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            id="monthly"
                                                        />
                                                    </FormControl>
                                                    <Label htmlFor="monthly" className="text-sm font-normal">Поддерживать ежемесячно</Label>
                                                </div>
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
                </div>
                <div className="flex justify-between items-center gap-4 text-muted-foreground md:text-sm text-xs mt-4">
                    <span>Оплата через Sber Pay</span>
                    <span className="text-right">Соглашаюсь с <span className="text-[#1EBCEE]">условиями оферты</span></span>
                </div>
            </div>
        </section>
    );
}
