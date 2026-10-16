import HeroSection from "@/components/HeroSection";
import GrowthSection from "@/components/GrowthSection";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
// import TeamSection from "@/components/TeamSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GrowthSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      {/* <TeamSection /> */}
      <ProcessSection />
      <FaqSection />
      <FooterSection />
    </>
  );
}
