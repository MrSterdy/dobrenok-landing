'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { GeneralDonationModal } from "@/app/components/GeneralDonationModal";

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-2 py-4 mx-auto max-w-screen-xl w-full px-6">
            <Link href="/" className="flex-shrink-0">
                <img src="/assets/images/logo.png" alt="Добрый ребёнок" className="h-14" />
            </Link>
            <nav className="hidden lg:flex lg:gap-8">
                <Link href="/">Главная</Link>
                <NavigationMenu>
                    <NavigationMenuList className="gap-8">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="h-auto p-0 text-base font-normal cursor-pointer !bg-transparent">
                                Кто мы
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col gap-2 p-4 w-[200px]">
                                    <li>
                                        <a href="https://dobrenok-fond.ru/nasha-komanda">Наша команда</a>
                                    </li>
                                    <li>
                                        <a href="https://dobrenok-fond.ru/o-fonde">О фонде</a>
                                    </li>
                                    <li>
                                        <a href="https://dobrenok-fond.ru/legenda-fonda">Легенда фонда</a>
                                    </li>
                                    <li>
                                        <a href="https://dobrenok-fond.ru/video">Видеогалерея</a>
                                    </li>
                                    <li>
                                        <a href="https://dobrenok-fond.ru/fotoalbom">Фотоальбом</a>
                                    </li>
                                    <li>
                                        <a href="https://dobrenok-fond.ru/my-v-smi">Мы в СМИ</a>
                                    </li>
                                    <li>
                                        <Link href="/dokumenty">Документы</Link>
                                    </li>
                                    <li>
                                        <Link href="/team">Команда</Link>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="h-auto p-0 text-base font-normal cursor-pointer !bg-transparent">
                                <a href="https://dobrenok-fond.ru/proekty/">Что делаем</a>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid grid-cols-1 w-[400px] gap-2 md:w-[800px] md:grid-cols-2 lg:w-[900px] lg:grid-cols-3 p-4">
                                    <li>
                                        <ul className="flex flex-col">
                                            <li className="font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/chelovek-i-priroda">Человек и природа</a>
                                            </li>
                                            <li className="mt-2">
                                                <a href="https://dobrenok-fond.ru/proekty/chelovek-i-priroda/ekologicheskoe-prosveschenie">Экологическое просвещение</a>
                                            </li>
                                            <li className="mt-0.5">
                                                <a href="https://dobrenok-fond.ru/proekty/chelovek-i-priroda/vliyanie-cheloveka-na-prirodu">Влияние человека на природу</a>
                                            </li>
                                            <li className="mt-0.5">
                                                <a href="https://dobrenok-fond.ru/proekty/chelovek-i-priroda/prirodoterapiya-i-vospitanie">Природотерапия и воспитание</a>
                                            </li>
                                            <li className="mt-0.5">
                                                <a href="https://dobrenok-fond.ru/proekty/chelovek-i-priroda/posadka-derevev">Посадка деревьев</a>
                                            </li>
                                            <li className="mt-1 font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/dobrenok">Проект «Добрёнок»</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="flex flex-col">
                                            <li className="font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/obrazovanie-i-vospitanie">Образование и воспитание</a>
                                            </li>
                                            <li className="mt-2">
                                                <a href="https://dobrenok-fond.ru/proekty/obrazovanie-i-vospitanie/aviamodelirovanie">Авиамоделирование</a>
                                            </li>
                                            <li className="mt-0.5">
                                                <a href="https://dobrenok-fond.ru/proekty/obrazovanie-i-vospitanie/master-klassy-deti-dlya-detey">Мастер-классы «Дети для детей»</a>
                                            </li>
                                            <li className="mt-14 font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/krestyanskiy-dvor">Проект «Крестьянский двор»</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="flex flex-col">
                                            <li className="font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/semeynoe-vzroslenie-i-osoznannoe-roditelstvo">Семейное взросление и осознанное родительство</a>
                                            </li>
                                            <li className="mt-2">
                                                <a href="https://dobrenok-fond.ru/proekty/semeynoe-vzroslenie-i-osoznannoe-roditelstvo/konsultatsii-dlya-roditeley-podrostkov">Консультации для родителей подростков</a>
                                            </li>
                                            <li className="mt-8.5 font-bold">
                                                <a href="https://dobrenok-fond.ru/proekty/zdorovaya-kuhnya">Проект «Здоровая кухня»</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <a href="https://dobrenok-fond.ru/meropriyatiya/">Мероприятия</a>
                <a href="https://dobrenok-fond.ru/novosti/">Новости</a>
                <a href="https://dobrenok-fond.ru/kontakty">Контакты</a>
            </nav>
            <div className="flex items-center gap-2">
                <GeneralDonationModal>
                    <Button size="lg" variant="green" className="hidden sm:block cursor-pointer shadow-none mx-4">
                        Хочу помочь
                    </Button>
                </GeneralDonationModal>
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
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/dokumenty">Документы</Link>
                                </Button>
                                <Button size="lg" variant="ghost" asChild className="cursor-pointer shadow-none justify-start px-4">
                                    <Link href="/team">Команда</Link>
                                </Button>
                            </nav>
                            <GeneralDonationModal>
                                <Button size="lg" variant="green" className="sm:hidden cursor-pointer shadow-none mx-4">
                                    Хочу помочь
                                </Button>
                            </GeneralDonationModal>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}