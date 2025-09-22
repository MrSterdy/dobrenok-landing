"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProjectApplication } from "@/lib/api/projects/project/create-project-application";
import { CreateVolunteerApplicationSchema } from "@/lib/schemas/CreateVolunteerApplicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const workOptions = [
    'Раздача афиш и флаеров',
    'Прозвон по базе контактов',
    'Рассылка писем',
    'Участие в опросах, сбор контактов',
    'Ведение экскурсий',
    'Помощь на мероприятиях',
    'Встреча и сопровождение гостей',
    'PR/SMM/продвижение',
    'Фото/видео съемка',
]

export function VolunteerSection() {
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (dialogOpen) {
            document.body.setAttribute('data-lenis-prevent', 'true');
        } else {
            document.body.removeAttribute('data-lenis-prevent');
        }
    }, [dialogOpen])

    const form = useForm({
        resolver: zodResolver(CreateVolunteerApplicationSchema),
        defaultValues: {
            name: "",
            age: "",
            phone: "",
            availability: "",
            hasCar: false,
            work: [],
        },
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        await createProjectApplication({
            name: "Волонтёрство",
            data,
        });
        toast.success('Заявка успешно подана')
        setDialogOpen(false)
        form.reset()
    });

    return (
        <section className="mx-auto max-w-screen-xl w-full px-4">
            <div className="flex flex-col items-center bg-[#32A535] rounded-lg mt-18 pt-18 pb-14">
                <h2 className="font-benzin text-center text-balance uppercase text-white text-3xl md:text-4xl">Стань волонтёром</h2>
                <p className="text-center text-balance text-white text-xl md:text-2xl mt-8">Стать волонтёром фонда очень просто. Заполните анкету, и в течение нескольких дней с вами свяжутся, чтобы пригласить на собеседование.</p>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" variant="yellow" className="cursor-pointer shadow-none text-xl md:text-2xl font-normal h-14 md:h-18 px-10 md:px-6 mt-6 rounded-xl md:rounded-lg">
                            Заполнить анкету
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Анкета волонтёра</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <ScrollArea className="h-[500px]" scrollBarClassName="-mr-4" type="always">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="volunteer-form">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Имя</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="shadow-none" placeholder="Иванов Иван Иванович" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Возраст</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="shadow-none" placeholder="20" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Телефон</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="shadow-none" placeholder="+7 (999) 999-99-99" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Когда вы доступны?</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="shadow-none w-full cursor-pointer">
                                                            <SelectValue placeholder="Весь день" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Утром">Утром</SelectItem>
                                                        <SelectItem value="Днем">Днем</SelectItem>
                                                        <SelectItem value="Вечером">Вечером</SelectItem>
                                                        <SelectItem value="Весь день">Весь день</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="work"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Какую работу можете выполнять?</FormLabel>
                                                {workOptions.map((item) => (
                                                    <FormField
                                                        key={item}
                                                        control={form.control}
                                                        name="work"
                                                        render={() => {
                                                            return (
                                                                <FormItem
                                                                    key={item}
                                                                    className="flex flex-row items-center gap-2"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            className="shadow-none cursor-pointer"
                                                                            checked={field.value?.includes(item)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange([...field.value, item])
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (value) => value !== item
                                                                                        )
                                                                                    )
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-sm font-normal">
                                                                        {item}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hasCar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Наличие автомобиля</FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            className="shadow-none cursor-pointer"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            id="hasCar"
                                                        />
                                                    </FormControl>
                                                    <Label htmlFor="hasCar" className="text-sm font-normal">У меня есть автомобиль</Label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </ScrollArea>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary" size="lg" className="cursor-pointer shadow-none">
                                        Отмена
                                    </Button>
                                </DialogClose>
                                <Button form="volunteer-form" variant="green" size="lg" className="cursor-pointer shadow-none">
                                    Отправить
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
