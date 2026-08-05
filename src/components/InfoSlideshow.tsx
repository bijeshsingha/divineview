"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Hotel Divine View",
    subtitle: "A striking presence in the heart of Guwahati, offering easy access to business hubs and local attractions.",
    image: "/images/hero.jpg", // Building / Aerial view
  },
  {
    title: "Executive Comfort",
    subtitle: "Experience warm hospitality and sanctuary-like comfort in our pristine executive suites.",
    image: "/images/rooms/exec1.jpg", // Executive Room
  },
  {
    title: "Comfort and Convenience",
    subtitle: "Well-appointed rooms providing a relaxing environment, complete with modern amenities for a perfect stay.",
    image: "/images/rooms/dlx1.jpg", // Deluxe Rooms
  },
  {
    title: "Gateway to the Northeast",
    subtitle: "Strategically located for exploring nearby natural wonders like Meghalaya and Arunachal Pradesh.",
    image: "/images/meghalaya.jpg", // Nature/Gateway
  },
  {
    title: "Explore Guwahati",
    subtitle: "Close to popular tourist destinations like Kamakhya Temple and Assam State Museum, offering a rich cultural experience.",
    image: "/images/guwahati-bg.png", // City / Landmarks
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
    <section className="relative w-full h-screen overflow-hidden bg-black group">
      {/* Top blending gradient (blends with Rooms bg-gray-50) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-gray-50 to-transparent z-20 pointer-events-none"></div>

      {/* Bottom blending gradient (blends with Facilities bg-white) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>

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
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-24 md:pb-32 transform transition-all duration-1000 translate-y-0 text-white z-30">
              <div className="w-16 h-[2px] bg-secondary mb-6 shadow-sm"></div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6 leading-tight drop-shadow-xl max-w-4xl tracking-wide">
                {slide.title}
              </h3>
              <p className="text-lg md:text-2xl font-light leading-relaxed drop-shadow-md text-gray-200 max-w-3xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls (Visible on Hover) */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-md text-white transition-all shadow-2xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-md text-white transition-all shadow-2xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full ${
              idx === currentSlide
                ? "bg-secondary w-10 h-1.5"
                : "bg-white/50 hover:bg-white/80 w-2.5 h-1.5"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
