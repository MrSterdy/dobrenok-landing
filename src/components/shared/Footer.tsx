import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-18 bg-[#363636] text-white" id="contacts">
            <section className="mx-auto max-w-screen-xl w-full px-6">
                <div className="px-6 py-10 xl:py-18">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14 xl:gap-16">
                        <div className="flex flex-col">
                            <img src="/assets/images/logo.png" alt="Добрый ребёнок" className="h-18 self-start mb-4" />
                            <p className="text-muted-foreground text-base leading-relaxed">
                                Фонд «Добрый ребёнок» занимается образовательными и воспитательными проектами, организует различные мероприятия и программы для детей.
                            </p>
                            <Button className="text-base font-normal h-11 rounded-full cursor-pointer shadow-none !px-6 mt-6 self-start" variant="green">
                                Оказание помощи
                                <Activity className="flex-shrink-0" />
                            </Button>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-medium text-xl mb-6">Жизнь фонда</h3>
                            <div className="flex gap-12">
                                <nav className="flex flex-col gap-2">
                                    <Link href="/#about-us" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Кто мы
                                    </Link>
                                    <Link href="/#projects" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Проекты
                                    </Link>
                                    <Link href="/#events" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Мероприятия
                                    </Link>
                                    <Link href="/#news" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Новости
                                    </Link>
                                </nav>
                                <nav className="flex flex-col gap-2">
                                    <Link href="/dokumenty" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Документы
                                    </Link>
                                    <Link href="/team" className="text-muted-foreground flex items-center gap-1">
                                        <ChevronRight className="opacity-50" strokeWidth={1.2} />
                                        Команда
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-medium text-xl mb-6">Контакты</h3>
                            <div className="flex flex-col gap-4">
                                <a href="tel:+78432126101" className="flex items-center gap-2">
                                    <Phone className="size-4" />
                                    +7 (843) 212-61-01
                                </a>
                                <a href="mailto:fond_dobrenok@mail.ru" className="flex items-center gap-2">
                                    <Mail className="size-4" />
                                    fond_dobrenok@mail.ru
                                </a>
                                <a href="https://yandex.ru/maps/-/CCUDH83g-A" className="flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    Казань, ул. Ершова д. 1а
                                </a>
                                <div className="flex items-center gap-3 mt-4">
                                    <a href="#" className="text-white">
                                        <FaWhatsapp className="size-6" />
                                    </a>
                                    <a href="#" className="text-white">
                                        <FaTelegramPlane className="size-6" />
                                    </a>
                                    <a href="#" className="text-white">
                                        <FaVk className="size-6" />
                                    </a>
                                    <a href="#" className="text-white">
                                        <FaYoutube className="size-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-muted-foreground px-6 py-6">
                    <p className="text-center text-muted-foreground">
                        © 2024-2025. Официальный сайт фонда «Добрый Ребёнок».
                    </p>
                </div>
            </section>
        </footer>
    );
}