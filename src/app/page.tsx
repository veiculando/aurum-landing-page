import { BackgroundDecor } from "@/components/aurum/BackgroundDecor";
import { Hero } from "@/components/aurum/Hero";
import { Formats } from "@/components/aurum/Formats";
import { BillboardCarousel } from "@/components/aurum/BillboardCarousel";
import { Coverage } from "@/components/aurum/Coverage";
import { Partners } from "@/components/aurum/Partners";
import { Testimonials } from "@/components/aurum/Testimonials";
import { About } from "@/components/aurum/About";
import { History } from "@/components/aurum/History";
import { ValuesAndTeam } from "@/components/aurum/ValuesAndTeam";
import { CtaSection } from "@/components/aurum/CtaSection";
import { getBanners, getSiteLinks } from "@/lib/cms";

// Conteúdo vem do Supabase (banners/site_settings) — sem isso a página
// ficaria estática para sempre a partir do build, e mudanças no CMS só
// apareceriam num redeploy.
export const revalidate = 300;

export default async function Home() {
  const [{ appLink }, banners] = await Promise.all([getSiteLinks(), getBanners()]);

  return (
    <div className="bg-[#F9F7F2] relative overflow-x-hidden w-full flex-1">
      <BackgroundDecor />
      <div className="relative z-10 w-full">
        <Hero appLink={appLink} />
        <Formats />
        <BillboardCarousel slides={banners} />
        <Coverage />
        <Partners />
        <Testimonials />
        <About />
        <History />
        <ValuesAndTeam />
        <CtaSection appLink={appLink} />
      </div>
    </div>
  );
}
