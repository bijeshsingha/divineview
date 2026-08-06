"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

export default function MeghalayaWater() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text fades out as user scrolls through
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Brightness: 50% -> 100% -> 50%
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0, 0.5]);

  return (
    <section ref={containerRef} id="meghalaya-water" className="relative w-full h-[200vh] bg-black">
      
      {/* Sticky background with water video */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover"
            style={{ zIndex: -1 }}
          >
            <source src="/videos/meghalaya-water.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Brightness overlay */}
        <m.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black z-0"
        />
      </div>

      {/* Scrolling foreground content */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col items-center">
        <div className="w-full flex flex-col items-center mt-[35vh] px-4 max-w-4xl mx-auto z-10 pointer-events-auto h-[145vh]">

          {/* Text block */}
          <m.div
            style={{ opacity: textOpacity }}
            className="text-center w-full mb-8"
          >
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.4em] uppercase mb-4 drop-shadow-md">
              The Abode of Clouds
            </p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl leading-tight">
              Waterfalls & Serenity
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto mb-8 shadow-sm"></div>
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
              Cascading falls, mist-covered valleys, and the raw beauty of Meghalaya's waterways.
            </p>
          </m.div>

          {/* Sticky button */}
          <a
            href="https://www.divineviewtours.com/explore/packages"
            target="_blank"
            rel="noopener noreferrer"
            className="sticky top-28 inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition-all duration-300 backdrop-blur-sm rounded-full tracking-wider uppercase text-sm shadow-2xl shadow-black/50"
          >
            View Itineraries
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}

