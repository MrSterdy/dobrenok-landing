export function AboutUsSection() {
    return (
        <section className="flex flex-col mx-auto max-w-screen-xl w-full px-6" id="about-us">
            <div className="flex items-center flex-col">
                <h2 className="uppercase font-benzin text-center text-balance text-4xl">Наша миссия</h2>
                <p className="text-muted-foreground text-2xl max-w-screen-sm text-center leading-tight mt-6"><span className="font-medium text-foreground">Проект «Добрёнок» — это сердце нашего фонда,</span> пространство, где дети вдохновляют взрослых на добрые дела, развитие и новые идеи.</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-wrap mt-18">
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-10 pb-12">
                    <img src="/assets/images/gear_up.png" className="size-18" />
                    <h3 className="font-medium text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Системная поддержка проектов</h3>
                    <p className="text-center leading-tight text-balance mt-4">В сфере воспитания и образования, направленных на культурно-нравственное формирование общества.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-10 pb-12">
                    <img src="/assets/images/people.png" className="size-18" />
                    <h3 className="font-medium text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Создание сообщества единомышленников</h3>
                    <p className="text-center leading-tight text-balance mt-4">Готовых работать над улучшением образовательной среды и условий для развития.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-10 pb-12">
                    <img src="/assets/images/book.png" className="size-18" />
                    <h3 className="font-medium text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Образовательные программы</h3>
                    <p className="text-center leading-tight text-balance mt-4">Доступных для всех слоев населения, направленных на развитие и самореализацию детей.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-10 pb-12">
                    <img src="/assets/images/baby.png" className="size-18" />
                    <h3 className="font-medium text-2xl text-balance text-center leading-tight mt-5 max-w-[200px]">Инклюзивная среда</h3>
                    <p className="text-center leading-tight text-balance mt-4">Где каждый ребёнок чувствует себя комфортно и может раскрыть свой потенциал.</p>
                </li>
            </ul>
        </section>
    );
}
