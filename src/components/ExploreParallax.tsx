"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoParallaxBackground = ({ src, zIndex }: { src: string, zIndex: number }) => {
  return (
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
        style={{ zIndex }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

const REGIONS = [
  {
    id: "meghalaya",
    title: "Discover Meghalaya",
    subtitle: "The Abode of Clouds",
    description: "Experience the living root bridges, pristine waterfalls, and the mystic charm of Cherrapunji.",
    link: "https://www.divineviewtours.com/explore/packages"
  }
];

export default function ExploreParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We track the scroll of the entire 400vh wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text fades out during the first 200vh section (0 to 0.5 of total scroll)
  // 0.2 represents about 80vh of scrolling
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Brightness curve over the whole 400vh:
  // Starts at 50% -> brightens to 100% -> stays 100% through the transition -> goes to 50% at the end
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 0, 0, 0.5]);

  const region = REGIONS[0];

  return (
    // Total height is 400vh to accommodate two 200vh consecutive sticky video sections
    <section ref={containerRef} id="explore-parallax" className="relative w-full h-[400vh] bg-black">
      
      {/* =======================================
          SECTION 1: MEGHALAYA BACKGROUND (200vh) 
          ======================================= */}
      <div className="absolute top-0 w-full h-[200vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <VideoParallaxBackground src="/videos/meghalaya-bg.mp4" zIndex={-2} />
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-0" 
          />
        </div>
      </div>

      {/* =======================================
          SECTION 2: WATERFALL BACKGROUND (200vh)
          (Scrolls up naturally and covers Section 1, then sticks)
          ======================================= */}
      <div className="absolute top-[200vh] w-full h-[200vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <VideoParallaxBackground src="/videos/meghalaya-water.mp4" zIndex={-1} />
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-0" 
          />
        </div>
      </div>

      {/* =======================================
          SHARED FOREGROUND CONTENT
          ======================================= */}
      {/* Placed absolutely over the ENTIRE 400vh wrapper */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col items-center z-10">
        
        {/* Push the content down so it starts vertically centered.
            By using h-[345vh], the content box ends just before the 400vh section ends,
            letting the sticky button un-stick right before the Founders section. */}
        <div className="w-full flex flex-col items-center mt-[35vh] px-4 max-w-4xl mx-auto pointer-events-auto h-[345vh]">
          
          {/* Animated Text Block - Native scroll up, Framer Motion fade out */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="text-center w-full mb-8"
          >
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.4em] uppercase mb-4 drop-shadow-md">
              {region.subtitle}
            </p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl leading-tight">
              {region.title}
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto mb-8 shadow-sm"></div>
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md">
              {region.description}
            </p>
          </motion.div>
          
          {/* Native Sticky Button - ZERO LAG. 
              Scrolls naturally with text, then sticks under the navbar for BOTH video sections! */}
          <a
            href={region.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky top-28 inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition-all duration-300 backdrop-blur-sm rounded-full tracking-wider uppercase text-sm shadow-2xl shadow-black/50"
          >
            View Itineraries
            <svg
              className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1"
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
