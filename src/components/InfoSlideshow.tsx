"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Welcome to Hotel Divine View",
    subtitle:
      "Situated in the heart of Guwahati City, our hotel offers easy access to business hubs, shopping centers, and local attractions.",
    image: "/images/hero.jpg",
  },
  {
    title: "Comfort and Convenience",
    subtitle:
      "Known for well-appointed rooms providing a relaxing environment, complete with stunning views of the city's landscape. Ideal for business and leisure travelers.",
    image: "/images/double-executive.jpg",
  },
  {
    title: "Gateway to Nearby States",
    subtitle:
      "Strategically located for exploring nearby states like Meghalaya and Arunachal Pradesh, making it perfect for travelers looking to discover the Northeast.",
    image: "/images/meghalaya.jpg",
  },
  {
    title: "Explore Cultural Landmarks",
    subtitle:
      "Close to popular tourist destinations like Kamakhya Temple, Assam State Museum, and Umananda Island, offering a rich cultural experience.",
    image: "/images/guwahati.jpg",
  },
  {
    title: "Exceptional Service & Ambiance",
    subtitle:
      "With exceptional service and a warm ambiance, Hotel Divine View ensures a memorable experience for all its guests.",
    image: "/images/family-executive.jpg",
  },
];

export default function InfoSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Discover the Divine Experience
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[16/10] md:aspect-[21/9]">
          {/* Images */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                <div className="p-8 md:p-16 max-w-2xl text-white transform transition-all duration-1000 translate-y-0">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-xl font-light leading-relaxed drop-shadow-md text-gray-100">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "bg-secondary scale-125 w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
