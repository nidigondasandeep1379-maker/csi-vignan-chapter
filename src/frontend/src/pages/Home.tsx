import Layout from "@/components/Layout";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import EventsSection from "@/sections/EventsSection";
import GallerySection from "@/sections/GallerySection";
import HeroSection from "@/sections/HeroSection";
import TeamSection from "@/sections/TeamSection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TeamSection />
      <GallerySection />
      <ContactSection />
    </Layout>
  );
}
