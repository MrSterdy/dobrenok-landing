'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { API_BASE_URL, API_PROJECT_ID } from "@/lib/consts/api";
import { Project } from "@/lib/types/project";
import { ProjectDonationModal } from "@/app/components/ProjectDonationModal";
import { useState, useEffect, useRef } from "react";

async function getAllOtherProjects(): Promise<Project[]> {
    try {
        const allProjects: Project[] = [];
        let currentPage = 1;
        let lastPage = 1;

        // Fetch first page to get pagination info
        const firstResponse = await fetch(new URL('/api/v1/projects?page=1&per_page=50', API_BASE_URL));
        const firstData = await firstResponse.json();

        if (!firstData.success) {
            return [];
        }

        allProjects.push(...firstData.data);
        lastPage = firstData.meta?.pagination.last_page || 1;

        // If there are more pages, fetch them all in parallel
        if (lastPage > 1) {
            const pagePromises = [];

            // Create promises for all remaining pages
            for (let page = 2; page <= lastPage; page++) {
                pagePromises.push(
                    fetch(new URL(`/api/v1/projects?page=${page}&per_page=50`, API_BASE_URL))
                        .then(res => res.json())
                );
            }

            // Execute all requests in parallel
            const responses = await Promise.all(pagePromises);

            // Collect all successful responses
            responses.forEach(response => {
                if (response.success) {
                    allProjects.push(...response.data);
                }
            });
        }

        // Filter out current project and sort alphabetically
        const currentProjectId = parseInt(API_PROJECT_ID || '0');
        return allProjects
            .filter(project => project.id !== currentProjectId)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const projectRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const fetchedProjects = await getAllOtherProjects();
            setProjects(fetchedProjects);
            setCurrentProject(fetchedProjects[0] || null);
            setLoading(false);
        }
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projects.length === 0) return;

        const cards = projectRefs.current.filter(ref => ref !== null) as HTMLElement[];
        const stackPosition = 0.1; // 10vh - как в sticky top
        const itemStackDistance = 20;
        const baseScale = 0.9;
        const itemScale = 0.02;

        const updateCardTransforms = () => {
            const scrollTop = window.scrollY;
            const containerHeight = window.innerHeight;
            const stackPositionPx = stackPosition * containerHeight;

            // Находим текущую карточку, которая находится в sticky позиции
            let currentIndex = -1;

            cards.forEach((card, i) => {
                if (!card) return;

                const rect = card.getBoundingClientRect();
                const cardTop = rect.top + scrollTop;
                const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
                const triggerEnd = cardTop - stackPositionPx * 0.3;

                // Проверяем, находится ли карточка в sticky позиции
                if (scrollTop >= triggerStart && rect.top <= stackPositionPx + 50) {
                    currentIndex = i;
                }

                let scaleProgress = 0;
                if (scrollTop < triggerStart) {
                    scaleProgress = 0;
                } else if (scrollTop > triggerEnd) {
                    scaleProgress = 1;
                } else {
                    scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
                }

                const targetScale = baseScale + i * itemScale;
                const scale = 1 - scaleProgress * (1 - targetScale);

                card.style.transform = `scale(${scale})`;
                card.style.transformOrigin = 'top center';
            });

            // Обновляем текущий проект
            if (currentIndex !== -1 && projects[currentIndex]) {
                setCurrentProject(projects[currentIndex]);
            }
        };

        updateCardTransforms();
        window.addEventListener('scroll', updateCardTransforms, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateCardTransforms);
        };
    }, [projects]);

    if (loading) {
        return (
            <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-10 mx-auto max-w-screen-xl w-full px-6" id="projects">
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <p className="text-muted-foreground text-xl">Загрузка проектов...</p>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-10 mx-auto max-w-screen-xl w-full px-6" id="projects">
                <div className="flex flex-col lg:justify-between gap-8 lg:sticky lg:top-0 py-8 lg:h-screen">
                    <div className="flex flex-col">
                        <h2 className="uppercase font-benzin text-balance text-center lg:text-left text-2xl lg:text-6xl">Проекты фонда</h2>
                        <p className="text-balance font-medium md:text-2xl text-center lg:text-left mt-6">Мы верим, что каждый из нас может сделать этот мир добрее, а дети — наш главный пример и источник вдохновения</p>
                    </div>
                    <div className="hidden lg:flex lg:flex-col">
                        <h4 className="text-balance font-medium text-2xl">Собрано на помощь в реализации</h4>
                        <Progress indicatorClassName="bg-[#F9AE00] rounded-r-full" value={20} className="h-4 mt-8" />
                        <div className="flex justify-between gap-4 text-lg text-muted-foreground mt-4">
                            <span>0 руб.</span>
                            <span>100.000 руб.</span>
                        </div>
                        <Button variant="blue" className="self-start mt-8">
                            Хочу помочь
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <p className="text-muted-foreground text-xl">Другие проекты не найдены</p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-6 md:mt-10 mx-auto max-w-screen-xl w-full px-6" id="projects">
            <div className="flex flex-col lg:justify-between gap-8 lg:sticky lg:top-0 py-8 lg:h-screen lg:z-10">
                <div className="flex flex-col">
                    <h2 className="uppercase font-benzin text-balance text-center lg:text-left text-2xl lg:text-6xl">Проекты фонда</h2>
                    <p className="text-balance font-medium md:text-2xl text-center lg:text-left mt-6">Мы верим, что каждый из нас можем сделать этот мир добрее, а дети — наш главный пример и источник вдохновения</p>
                </div>
                <div className="hidden lg:flex lg:flex-col">
                    <h4 className="text-balance font-medium text-2xl">Собрано на помощь в реализации</h4>
                    <Progress
                        indicatorClassName="bg-[#F9AE00] rounded-r-full"
                        value={currentProject?.payment_goal?.progress_percentage || 0}
                        className="h-4 mt-8"
                    />
                    <div className="flex justify-between gap-4 text-lg text-muted-foreground mt-4">
                        <span>{currentProject?.payment_goal?.current_amount?.toLocaleString() || 0} руб.</span>
                        <span>{currentProject?.payment_goal?.target_amount?.toLocaleString() || 0} руб.</span>
                    </div>
                    {currentProject && (
                        <ProjectDonationModal project={currentProject}>
                            <Button variant="blue" className="self-start mt-8">
                                Хочу помочь
                            </Button>
                        </ProjectDonationModal>
                    )}
                </div>
            </div>
            <ul className="grid gap-8 min-w-[40%] max-w-128">
                {projects.map((project, index) => (
                    <li
                        key={project.id}
                        ref={(el) => { projectRefs.current[index] = el; }}
                        className="flex flex-col w-full items-center justify-between rounded-lg bg-secondary pt-2 md:pt-6 lg:pt-10 pb-4 lg:pb-8 px-4 lg:px-6 sticky top-[10vh]"
                        style={{
                            marginBottom: `${200}px`,
                            willChange: 'transform',
                            transformOrigin: 'top center'
                        }}
                    >
                        <div className="flex flex-col items-center w-full">
                            <h3 className="font-benzin text-balance md:text-3xl text-center">{project.name}</h3>
                            {project.cover_photo_url ? (
                                <img src={project.cover_photo_url} alt={project.name} className="bg-white rounded-lg h-86 lg:h-64 w-full object-cover mt-4 md:mt-8" />
                            ) : (
                                <div className="bg-white rounded-lg h-86 lg:h-64 w-full mt-4 md:mt-8">
                                </div>
                            )}
                            {project.description && (
                                <p className="text-muted-foreground text-balance text-center mt-6 text-sm md:text-2xl">
                                    {project.description}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col w-full mt-8 lg:mb-8">
                            <Progress
                                indicatorClassName="bg-[#F9AE00] rounded-r-full"
                                value={project.payment_goal?.progress_percentage || 0}
                                className="h-2 md:h-4 mt-8 lg:hidden"
                            />
                            <div className="flex justify-between gap-4 text-muted-foreground mt-2 md:mt-4 lg:hidden">
                                <span>{project.payment_goal?.current_amount?.toLocaleString() || 0} руб.</span>
                                <span>{project.payment_goal?.target_amount?.toLocaleString() || 0} руб.</span>
                            </div>
                            <div className="w-full grid grid-cols-2 lg:grid-cols-1 lg:place-items-center gap-2 mt-4">
                                <ProjectDonationModal project={project}>
                                    <Button size="lg" variant="blue" className="cursor-pointer shadow-none md:text-xl lg:text-2xl font-normal md:h-14 lg:h-18 md:rounded-lg lg:hidden">
                                        Хочу помочь
                                    </Button>
                                </ProjectDonationModal>
                                <Button size="lg" variant="green" className="cursor-pointer shadow-none md:text-xl lg:text-2xl font-normal md:h-14 lg:h-18 md:rounded-lg">
                                    Узнать подробнее
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
