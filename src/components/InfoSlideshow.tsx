"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Executive Suite",
    subtitle: "Experience warm hospitality and sanctuary-like comfort in our pristine executive suites.",
    image1: "/images/rooms/exec1.jpg",
    image2: "/images/rooms/exec2.jpg",
  },
  {
    title: "Deluxe Comfort",
    subtitle: "Well-appointed rooms providing a relaxing environment, complete with modern amenities for a perfect stay.",
    image1: "/images/rooms/dlx1.jpg",
    image2: "/images/rooms/dlx2.jpg",
  },
  {
    title: "Family Room",
    subtitle: "Spacious accommodations designed to keep the whole family comfortable and connected.",
    image1: "/images/rooms/fam1.jpg",
    image2: "/images/rooms/fam2.jpg",
  },
  {
    title: "Executive Excellence",
    subtitle: "A premium experience with dedicated workspaces and elegant decor.",
    image1: "/images/rooms/exec3.jpg",
    image2: "/images/rooms/exec4.jpg",
  },
  {
    title: "Standard Comfort",
    subtitle: "Cozy, efficient, and exceptionally clean rooms for the smart traveler.",
    image1: "/images/rooms/std2.jpg",
    image2: "/images/rooms/std3.jpg",
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

      {/* Images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
              <Image
                src={slide.image1}
                alt={`${slide.title} - View 1`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
              <Image
                src={slide.image2}
                alt={`${slide.title} - View 2`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
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
