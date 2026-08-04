import DivineViewNavbar from "@/components/DivineViewNavbar";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Image from "next/image";
import HeroBookingWidget from "@/components/HeroBookingWidget";

export default function DivineView() {
  return (
    <>
      <DivineViewNavbar />
      <main className="flex-grow">
        {/* Cinematic Parallax Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        >
          {/* Elegant dark forest green to black gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a2414]/70 via-[#06180c]/80 to-background" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20 w-full">
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.3em] uppercase mb-4 drop-shadow-md">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl mx-auto tracking-wide">
              Hotel Divine View
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full shadow-lg"></div>
            
            <HeroBookingWidget />
          </div>
        </section>
        <Rooms />
        <Facilities />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
