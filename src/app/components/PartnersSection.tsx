import { getProjectPartners } from '@/lib/api/projects/project/get-project-partners';
import { Partner } from '@/lib/types/partner';

async function getAllPartners(): Promise<Partner[]> {
    try {
        // Fetch first page to get pagination info
        const firstResponse = await getProjectPartners({
            page: 1,
            per_page: 50
        });

        if (!firstResponse.success) {
            return [];
        }

        const allPartners: Partner[] = [...firstResponse.data];
        const lastPage = firstResponse.meta?.pagination.last_page || 1;

        // If there are more pages, fetch them all in parallel
        if (lastPage > 1) {
            const pagePromises = [];

            // Create promises for all remaining pages
            for (let page = 2; page <= lastPage; page++) {
                pagePromises.push(
                    getProjectPartners({
                        page,
                        per_page: 50
                    })
                );
            }

            // Execute all requests in parallel
            const responses = await Promise.all(pagePromises);

            // Collect all successful responses
            responses.forEach(response => {
                if (response.success) {
                    allPartners.push(...response.data);
                }
            });
        }

        // Sort all partners alphabetically by name
        return allPartners.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    } catch (error) {
        console.error('Failed to fetch partners:', error);
        return [];
    }
}

export async function PartnersSection() {
    const partners = await getAllPartners();

    if (partners.length === 0) {
        return (
            <section className="flex flex-col mt-18 pb-14 mx-auto max-w-screen-xl w-full px-6">
                <h2 className="font-benzin text-center text-balance uppercase text-4xl">Наши партнеры</h2>
                <p className="text-center text-muted-foreground mt-16">Партнеры не найдены</p>
            </section>
        );
    }

    return (
        <section className="flex flex-col mt-12 md:mt-18 pb-10 md:pb-14 mx-auto max-w-screen-xl w-full px-6">
            <h2 className="font-benzin text-center text-balance uppercase text-xl md:text-4xl">Наши партнеры</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 flex-wrap">
                {partners.map((partner) => (
                    <li key={partner.id} className="grid place-items-center">
                        <img
                            src={partner.cover_photo_url}
                            alt={partner.name}
                            title={partner.description || partner.name}
                            className="h-32 object-contain hover:scale-105 transition-transform duration-200"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
