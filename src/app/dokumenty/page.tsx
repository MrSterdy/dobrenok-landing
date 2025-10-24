import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Документы | Фонд Добрый Ребёнок",
    description: "Официальные документы, финансовые отчёты и организационная отчётность фонда Добрый Ребёнок. Прозрачность и открытость в нашей деятельности.",
};

interface Document {
    title: string;
    description?: string;
    href: string;
    icon: string;
}

const documents: Document[] = [
    {
        title: "Устав фонда",
        href: "/docs/ustav.pdf",
        icon: "📄"
    },
    {
        title: "Согласие на обработку персональных данных",
        href: "/docs/soglasie-na-obrabotku-personalnyh-dannyh.pdf",
        icon: "📝"
    },
    {
        title: "Согласие на обработку персональных данных ребёнка",
        href: "/docs/soglasie-na-obrabotku-dannyh-detey.docx",
        icon: "📝"
    },
    {
        title: "Публичная оферта",
        href: "/docs/publichnaya-oferta.pdf",
        icon: "📋"
    },
    {
        title: "Политика конфиденциальности",
        href: "/docs/politika-konfidencialnosti.pdf",
        icon: "🔒"
    },
    {
        title: "Пользовательское соглашение",
        href: "/docs/polzovatelskoe-soglashenie.pdf",
        icon: "📃"
    },
    {
        title: "Карта партнера",
        href: "/docs/partner-card.docx",
        icon: "🤝"
    }
];

const financialReports: Document[] = [
    {
        title: "Отчет за 2024 год",
        description: "Фонд «Добрый ребёнок» занимается образовательными и воспитательными проектами, организует различные мероприятия и программы для детей.",
        href: "/docs/2024.pdf",
        icon: "📊"
    }
];

export default function DocumentsPage() {
    return (
        <main className="flex flex-col flex-grow">
            <section className="flex flex-col mx-auto max-w-screen-xl w-full px-6 py-12 md:py-16">
                {/* Основные документы */}
                <div>
                    <h2 className="font-benzin text-2xl md:text-4xl text-center mb-8">
                        Основные документы
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {documents.map((doc) => (
                            <a
                                key={doc.href}
                                href={doc.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-secondary rounded-lg p-6 hover:bg-secondary/80 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl flex-shrink-0">{doc.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-lg md:text-xl text-balance leading-tight group-hover:text-primary transition-colors">
                                            {doc.title}
                                        </h3>
                                        {doc.description && (
                                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                                {doc.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                                            <span>Посмотреть</span>
                                            <svg
                                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Финансовые отчёты */}
                <div className="mt-16 md:mt-20">
                    <h2 className="font-benzin text-2xl md:text-4xl text-center mb-4">
                        Финансовые отчёты
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
                        {financialReports.map((report) => (
                            <a
                                key={report.href}
                                href={report.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-secondary rounded-lg p-6 md:p-8 hover:bg-secondary/80 transition-colors"
                            >
                                <div className="flex items-start gap-4 md:gap-6">
                                    <span className="text-5xl md:text-6xl flex-shrink-0">{report.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-xl md:text-2xl text-balance leading-tight group-hover:text-primary transition-colors">
                                            {report.title}
                                        </h3>
                                        {report.description && (
                                            <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed">
                                                {report.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-4 text-sm md:text-base text-primary font-medium">
                                            <span>Посмотреть</span>
                                            <svg
                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

