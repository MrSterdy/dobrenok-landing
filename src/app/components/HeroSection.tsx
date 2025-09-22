import { Button } from "@/components/ui/button";

export function HeroSection() {
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
                        <Button size="lg" variant="secondary" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8">250₽</Button>
                        <Button size="lg" variant="secondary" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8">500₽</Button>
                        <Button size="lg" variant="secondary" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8">750₽</Button>
                        <Button size="lg" variant="secondary" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8">1000₽</Button>
                        <Button size="lg" variant="secondary" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8 col-span-2 md:col-span-1">Другая сумма</Button>
                    </div>
                    <Button size="lg" variant="blue" className="cursor-pointer shadow-none text-base lg:text-lg xl:text-xl font-normal h-10 lg:h-14 xl:h-18 px-4 lg:px-6 xl:px-8">Я хочу помочь</Button>
                </div>
                <div className="flex justify-between items-center gap-4 text-muted-foreground md:text-sm text-xs mt-4">
                    <span>Оплата через Sber Pay</span>
                    <span className="text-right">Соглашаюсь с <span className="text-[#1EBCEE]">условиями оферты</span></span>
                </div>
            </div>
        </section>
    );
}
