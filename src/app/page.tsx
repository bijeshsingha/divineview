import PortalNavbar from "@/components/PortalNavbar";
import Hero from "@/components/Hero";
import ExploreGuwahati from "@/components/ExploreGuwahati";
import ExploreParallax from "@/components/ExploreParallax";
import JourneyScroll from "@/components/JourneyScroll";
import OurPortfolio from "@/components/OurPortfolio";
import PortalFooter from "@/components/PortalFooter";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <main className="bg-white min-h-screen">
        {/* Portal Navbar overrides the default one to not conflict with hotel themes */}
        <PortalNavbar />
        
        <Hero />
        
        {/* Journey Scroll */}
        <JourneyScroll />

        {/* Portfolio - placed right after founders */}
        <OurPortfolio />

        {/* Explore Guwahati Details */}
        <ExploreGuwahati />

        {/* Parallax Explore Section (At the end) */}
        <ExploreParallax />
      </main>
      <PortalFooter />
      <ScrollToTopButton />
    </>
  );
}
