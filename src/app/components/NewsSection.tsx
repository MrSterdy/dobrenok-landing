import Link from 'next/link';
import { getProjectNews } from '@/lib/api/projects/project/get-project-news';
import { NewsPost } from '@/lib/types/news';

async function getLatestNews(): Promise<NewsPost[]> {
    try {
        const response = await getProjectNews({
            per_page: 4,
            status: 'published',
            sort_by: 'published_at',
            sort_direction: 'desc'
        });

        if (response.success) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return [];
    }
}

const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export async function NewsSection() {
    const news = await getLatestNews();

    return (
        <section className="flex flex-col mt-18 pb-14 mx-auto max-w-screen-xl w-full px-6" id="news">
            <h2 className="font-benzin text-center text-balance uppercase text-4xl">Новости фонда</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {news.slice(0, 3).map((post) => (
                    <Link
                        key={post.id}
                        href={`/news/${post.slug}`}
                        className="flex relative flex-col rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
                    >
                        <img
                            src={post.cover_photo_url}
                            alt={post.photo_alt_text || post.title}
                            className="w-full h-[60%] object-cover inset-0 absolute brightness-70 rounded-lg -z-10"
                        />
                        <img
                            src={post.cover_photo_url}
                            alt={post.photo_alt_text || post.title}
                            className="w-full h-full object-cover inset-0 absolute brightness-50 blur-xl rounded-lg -z-20 bg-bottom"
                        />
                        <div className="h-64"></div>
                        <div className="flex flex-col gap-2 px-4 pb-4 text-white">
                            <p className="text-balance">{formatDate(post.published_at || post.created_at)}</p>
                            <h3 className="text-xl text-balance line-clamp-3">{post.title}</h3>
                            {post.sub_title && (
                                <p className="text-balance line-clamp-2">{post.sub_title}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
