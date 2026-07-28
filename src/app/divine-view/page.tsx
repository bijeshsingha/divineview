import Navbar from "@/components/Navbar";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function DivineView() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Elegant Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.jpg"
              alt="Hotel Divine View"
              fill
              className="object-cover"
              priority
            />
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.3em] uppercase mb-4 drop-shadow-md">
              Welcome to
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Hotel Divine View
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md">
              Your sanctuary of comfort and elegance in the heart of Paltan Bazaar, Guwahati.
            </p>
            <a
              href="#rooms"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Our Rooms
            </a>
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
