import PortalNavbar from "@/components/PortalNavbar";
import Hero from "@/components/Hero";
import ExploreGuwahati from "@/components/ExploreGuwahati";
import ExploreParallax from "@/components/ExploreParallax";
import JourneyScroll from "@/components/JourneyScroll";
import OurPortfolio from "@/components/OurPortfolio";
import PortalFooter from "@/components/PortalFooter";

export default function Home() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-grow">
        <Hero />
        {/* Journey Scroll — Our Story + Meet the Founders */}
        <JourneyScroll />

        {/* Portfolio - placed right after founders */}
        <OurPortfolio />

        {/* Explore Guwahati Details */}
        <ExploreGuwahati />

        {/* Explore Section with Parallax */}
        <ExploreParallax />
      </main>
      <PortalFooter />
    </>
  );
}


