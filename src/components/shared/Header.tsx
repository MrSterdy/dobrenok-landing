import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-2 py-4 mx-auto max-w-screen-xl w-full px-6">
            <Link href="/" className="flex-shrink-0">
                <img src="/assets/images/logo.png" alt="Добрый ребёнок" className="h-14" />
            </Link>
            <nav className="hidden lg:flex lg:gap-8">
                <Link href="/">Главная</Link>
                <Link href="/#about-us">Кто мы</Link>
                <Link href="/#projects">Что делаем</Link>
                <Link href="/#events">Мероприятия</Link>
                <Link href="/#news">Новости</Link>
                <Link href="/#contacts">Контакты</Link>
            </nav>
            <div className="flex items-center gap-2">
                <Button size="lg" variant="green" className="hidden sm:block cursor-pointer shadow-none mx-4">
                    Хочу помочь
                </Button>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" className="cursor-pointer shadow-none lg:hidden" variant="ghost">
                            <Menu className="size-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Меню</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6">
                            <nav className="flex flex-col gap-1">
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/">Главная</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/#about-us">Кто мы</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/#projects">Что делаем</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/#events">Мероприятия</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/#news">Новости</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/#contacts">Контакты</Link>
                                </Button>
                            </nav>
                            <Button size="lg" variant="green" className="sm:hidden cursor-pointer shadow-none mx-4">
                                Хочу помочь
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}