import { notFound } from 'next/navigation';
import { getProjectNewsBySlug } from '@/lib/api/projects/project/get-project-news-by-slug';
import { NewsPost } from '@/lib/types/news';

interface NewsPageProps {
    params: {
        slug: string;
    };
}

async function getNewsPost(slug: string): Promise<NewsPost | null> {
    try {
        const response = await getProjectNewsBySlug({ slug });
        if (response.success) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch news post:', error);
        return null;
    }
}

export default async function NewsPage(props: NewsPageProps) {
    const params = await props.params

    const post = await getNewsPost(params.slug);
    if (!post) {
        notFound();
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <article className="flex flex-col flex-grow">
            <section className="flex flex-col mx-auto max-w-screen-xl w-full px-6 mt-18">
                <img
                    src={post.cover_photo_url}
                    alt={post.photo_alt_text || post.title}
                    className="w-full rounded-xl h-[400px] object-cover"
                />
                <div className="flex flex-col mt-9">
                    <h1 className="uppercase font-benzin text-balance text-4xl">{post.title}</h1>
                    {post.sub_title && (
                        <h2 className="text-balance text-xl mt-2">{post.sub_title}</h2>
                    )}
                    <p className="text-balance mt-4 text-muted-foreground">
                        Опубликовано {formatDate(post.published_at || post.created_at)}
                    </p>
                    <div
                        className="prose lg:prose-xl mt-9 flex-grow max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </div>
            </section>
        </article>
    );
}