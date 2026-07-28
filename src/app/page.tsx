import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import Founders from "@/components/Founders";
import PortalFooter from "@/components/PortalFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* About Section */}
        <section id="about" className="relative min-h-screen bg-[#FDFBF7] flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.3em] uppercase mb-6">
              Our Story
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              About Divine View Group
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mb-10"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 font-light">
              At Divine View, we believe in offering an unparalleled hospitality experience in the heart of the Northeast. 
              Our properties are meticulously designed to provide comfort, elegance, and convenience to every traveler.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              Whether you are visiting for business, leisure, or embarking on a grand tour of Meghalaya, 
              our dedicated team ensures your stay is nothing short of divine.
            </p>
          </div>

          {/* Bouncing Down Arrow */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <a href="#explore" aria-label="Scroll down" className="text-secondary opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        <Explore />
        <Founders />
      </main>
      <PortalFooter />
    </>
  );
}
