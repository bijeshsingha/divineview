import PortalNavbar from "@/components/PortalNavbar";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Image from "next/image";
import HeroBookingWidget from "@/components/HeroBookingWidget";
import InfoSlideshow from "@/components/InfoSlideshow";
import PackagesSection from "@/components/PackagesSection";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function DivineView() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-grow">
        {/* Cinematic Parallax Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        >
          {/* Simple lighter overlay for a brighter, energetic feel */}
          <div className="absolute inset-0 z-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20 w-full">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative w-28 h-24 md:w-36 md:h-28">
                <Image 
                  src="/images/hdv-icon-only.png" 
                  alt="Hotel Divine View Logo" 
                  fill 
                  priority
                  className="object-contain drop-shadow-md" 
                />
              </div>
              <div className="flex flex-col text-left border-l-2 border-white/30 pl-6 py-2">
                <span className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-[0.3em] leading-none mb-2">Hotel</span>
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-none mb-2 drop-shadow-xl tracking-wide">Divine View</span>
                <span className="text-sm md:text-base italic text-gray-200 font-serif tracking-wider">Your Smart Basecamp in the North East</span>
              </div>
            </div>
            
            <HeroBookingWidget />
          </div>
        </section>
        
        <Rooms />
        
        <PackagesSection hotel="divine-view" />
        
        <InfoSlideshow />
        
        <Facilities />
        <Reviews />
      </main>
      <Footer />
      <WhatsAppFAB phoneNumber="+916901741211" />
    </>
  );
}
