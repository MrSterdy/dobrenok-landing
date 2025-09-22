import { HeroSection } from "@/app/components/HeroSection";
import { AboutUsSection } from "@/app/components/AboutUsSection";
import { VolunteerSection } from "@/app/components/VolunteerSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { EventsSection } from "@/app/components/EventsSection";
import { NewsSection } from "@/app/components/NewsSection";
import { PartnersSection } from "@/app/components/PartnersSection";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <article className="flex flex-col flex-grow">
      <HeroSection />
      <AboutUsSection />
      <VolunteerSection />
      <ProjectsSection />
      <EventsSection />
      <NewsSection />
      <PartnersSection />
    </article>
  );
}
