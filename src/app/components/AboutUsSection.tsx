export function AboutUsSection() {
    return (
        <section className="flex flex-col mx-auto max-w-screen-xl w-full px-6 md:-mt-12" id="about-us">
            <div className="flex items-center flex-col">
                <h2 className="uppercase font-benzin text-center text-balance text-xl md:text-4xl">Наша миссия</h2>
                <p className="text-muted-foreground text-base md:text-2xl max-w-screen-sm text-center leading-tight mt-6">
                    Создавать добрую и созидательную среду, в которой каждый ребёнок может раскрыть свой потенциал, вырасти в духовно-нравственную и социально зрелую личность. Мы верим, что это возможно только тогда, когда рядом — семья и общество, разделяющие ценности образования и воспитания и готовые быть примером.
                </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 flex-wrap mt-12 md:mt-18">
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-6 md:pt-10 pb-8 md:pb-12">
                    <img src="/assets/images/gear_up.png" className="size-14 md:size-18" />
                    <h3 className="font-medium text-lg md:text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Системная поддержка проектов</h3>
                    <p className="text-center leading-tight text-balance mt-4">Помогаем детям воплощать идеи в реальность, обеспечиваем образовательные и организационные ресурсы, чтобы инициативы приносили результат.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-6 md:pt-10 pb-8 md:pb-12">
                    <img src="/assets/images/people.png" className="size-14 md:size-18" />
                    <h3 className="font-medium text-lg md:text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Создание сообщества единомышленников</h3>
                    <p className="text-center leading-tight text-balance mt-4">Объединяем детей и взрослых, готовых действовать вместе, делиться опытом и поддерживать друг друга в реализации добрых инициатив.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-6 md:pt-10 pb-8 md:pb-12">
                    <img src="/assets/images/book.png" className="size-14 md:size-18" />
                    <h3 className="font-medium text-lg md:text-2xl text-balance text-center leading-tight mt-5 max-w-[250px]">Образовательные программы</h3>
                    <p className="text-center leading-tight text-balance mt-4">Разрабатываем и реализуем доступные для всех программы, направленные на развитие навыков, самостоятельности и творческого потенциала детей.</p>
                </li>
                <li className="bg-secondary rounded-lg flex flex-col items-center px-4 pt-6 md:pt-10 pb-8 md:pb-12">
                    <img src="/assets/images/baby.png" className="size-14 md:size-18" />
                    <h3 className="font-medium text-lg md:text-2xl text-balance text-center leading-tight mt-5 max-w-[200px]">Инклюзивная среда</h3>
                    <p className="text-center leading-tight text-balance mt-4">Создаём условия, где каждый ребёнок чувствует себя комфортно, может проявлять свои способности и быть услышанным в коллективе.</p>
                </li>
            </ul>
        </section>
    );
}
