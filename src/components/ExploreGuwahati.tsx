"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const PLACES = [
  {
    id: "kamakhya",
    title: "Kamakhya Temple",
    description: "An ancient shakti peeth atop the Nilachal hills.",
    image: "/images/guwahati/kamakhya.jpg",
  },
  {
    id: "brahmaputra",
    title: "Brahmaputra River",
    description: "Serene sunset cruises and riverside beauty.",
    image: "/images/guwahati/brahmaputra.jpg",
  },
  {
    id: "kaziranga",
    title: "Gateway to Wildlife",
    description: "Your starting point for Northeast adventures.",
    image: "/images/readymade-tour.jpg",
  }
];

export default function ExploreGuwahati() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text: scrolls up and fades out as first image appears. Stays GONE for the rest of the scroll.
  // Opacity is clamped at 0 from 0.3 onward - it will never reappear.
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1.0], [1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], ["0vh", "-50vh"]);

  // Image animations (Desktop only): 
  // STRICTLY SEQUENTIAL: One image finishes completely before the next begins.
  // img1: finishes at 0.35. img2 starts at 0.4. img2 finishes at 0.65. img3 starts at 0.7.
  const img1Y = useTransform(scrollYProgress, [0.1, 0.35], ["100%", "0%"]);
  const img2Y = useTransform(scrollYProgress, [0.4, 0.65], ["100%", "0%"]);
  const img3Y = useTransform(scrollYProgress, [0.7, 0.95], ["100%", "0%"]);

  return (
    <>
      {/* 
        ========================================
        DESKTOP VERSION (Sticky Parallax)
        ========================================
      */}
      <section ref={containerRef} className="hidden md:block relative w-full h-[400vh] bg-white">
        {/* Sticky wrapper that stays on screen while the 300vh container scrolls */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
          
          {/* Title Section (Centered, scrolls up and fades out, stays gone) */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto z-10 pointer-events-none"
          >
            <p className="text-sm text-primary font-medium tracking-[0.4em] uppercase mb-4">
              Gateway to the Northeast
            </p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
              Explore Guwahati
            </h2>
            <div className="w-24 h-[2px] bg-primary mx-auto mb-8" />
            <p className="text-lg md:text-xl text-gray-600 font-light">
              From the spiritual heights of Kamakhya Temple to the serene Brahmaputra river cruises.
            </p>
          </motion.div>

          {/* 3 Parallel Images (Pulling up slowly one by one) */}
          <div className="absolute inset-0 flex flex-row w-full h-full z-20 pointer-events-none">
            
            <motion.div style={{ y: img1Y }} className="relative w-1/3 h-full group pointer-events-auto">
              <Image src={PLACES[0].image} alt={PLACES[0].title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{PLACES[0].title}</h3>
                <p className="text-base text-gray-300 font-light">{PLACES[0].description}</p>
              </div>
            </motion.div>

            <motion.div style={{ y: img2Y }} className="relative w-1/3 h-full group pointer-events-auto">
              <Image src={PLACES[1].image} alt={PLACES[1].title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{PLACES[1].title}</h3>
                <p className="text-base text-gray-300 font-light">{PLACES[1].description}</p>
              </div>
            </motion.div>

            <motion.div style={{ y: img3Y }} className="relative w-1/3 h-full group pointer-events-auto">
              <Image src={PLACES[2].image} alt={PLACES[2].title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{PLACES[2].title}</h3>
                <p className="text-base text-gray-300 font-light">{PLACES[2].description}</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        ========================================
        MOBILE VERSION (Stacked Scrolling)
        ========================================
      */}
      <section className="block md:hidden w-full bg-white text-gray-900 pb-10">
        <div className="pt-24 pb-12 px-4 text-center">
          <p className="text-xs text-primary font-medium tracking-[0.3em] uppercase mb-4">
            Gateway to the Northeast
          </p>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Explore Guwahati
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
          <p className="text-base text-gray-600 font-light">
            From the spiritual heights of Kamakhya Temple to the serene Brahmaputra river cruises.
          </p>
        </div>

        <div className="flex flex-col w-full h-auto">
          {PLACES.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[70vh]"
            >
              <Image src={place.image} alt={place.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{place.title}</h3>
                <p className="text-sm text-gray-300 font-light">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
