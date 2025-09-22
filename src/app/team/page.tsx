import { TeamSection } from './components/TeamSection';

export const dynamic = 'force-dynamic'

export default function TeamPage() {
    return (
        <article className="flex flex-col flex-grow">
            <TeamSection />
        </article>
    );
}