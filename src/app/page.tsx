import { BackgroundDecor } from "@/components/aurum/BackgroundDecor";
import { Hero } from "@/components/aurum/Hero";
import { Formats } from "@/components/aurum/Formats";
import { BillboardCarousel } from "@/components/aurum/BillboardCarousel";
import { Coverage } from "@/components/aurum/Coverage";
import { Partners } from "@/components/aurum/Partners";
import { Testimonials } from "@/components/aurum/Testimonials";
import { About } from "@/components/aurum/About";
import { CtaSection } from "@/components/aurum/CtaSection";

export default function Home() {
  return (
    <div className="bg-[#F9F7F2] relative overflow-x-hidden w-full flex-1">
      <BackgroundDecor />
      <div className="relative z-10 w-full">
        <Hero />
        <Formats />
        <BillboardCarousel />
        <Coverage />
        <Partners />
        <Testimonials />
        <About />
        <CtaSection />
      </div>
    </div>
  );
}
