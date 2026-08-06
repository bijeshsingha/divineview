"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background Video (Fixed Parallax Effect) */}
      <div 
        className="absolute inset-0 z-0"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="fixed top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 6) {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }
          }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability (also fixed so it stays over the video) */}
        <div className="fixed inset-0 bg-black/60" style={{ zIndex: -1 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        
        {/* Central Logo/Text */}
        <div className="mb-24 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-[0.2em] uppercase mb-4 opacity-90 drop-shadow-lg">
            Divine View
          </h1>
          <p className="text-xs md:text-sm text-gray-300 tracking-[0.4em] uppercase drop-shadow-md">
            Hotels and Tours
          </p>
        </div>

        {/* Hotel Options Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full max-w-6xl">
          
          <Link href="/divine-view" className="group flex flex-col items-center text-center cursor-pointer px-4">
            <div className="h-24 md:h-32 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-20 md:w-28 md:h-24">
                  <Image 
                    src="/images/hdv-icon-only.png" 
                    alt="Hotel Divine View Logo" 
                    fill 
                    priority
                    className="object-contain drop-shadow-md" 
                  />
                </div>
                <div className="flex flex-col text-left border-l-2 border-white/20 pl-4 py-1">
                  <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-[0.2em] leading-none mb-1.5">Hotel</span>
                  <span className="text-2xl md:text-4xl font-black text-white uppercase leading-none mb-1.5 drop-shadow-lg tracking-wide">Divine View</span>
                  <span className="text-xs md:text-sm italic text-gray-300 font-serif tracking-wider">Your Stay in North east</span>
                </div>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
              Paltan Bazaar
            </p>
            {/* Animated underline */}
            <div className="w-0 h-0.5 bg-secondary mt-4 transition-all duration-500 ease-in-out group-hover:w-full" />
          </Link>

          {/* Separator - Hidden on mobile */}
          <div className="hidden md:block w-px h-16 bg-white/30" />

          <Link href="/ambarish" className="group flex flex-col items-center text-center cursor-pointer px-4">
            <div className="h-24 md:h-32 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-72 md:w-80 h-24 md:h-32 -mt-2">
                <Image 
                  src="/images/ambarish-logo.png" 
                  alt="Hotel Ambarish Grand Residency" 
                  fill 
                  priority
                  className="object-contain drop-shadow-md" 
                />
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
              Paltan Bazaar
            </p>
            <div className="w-0 h-0.5 bg-secondary mt-4 transition-all duration-500 ease-in-out group-hover:w-full" />
          </Link>

        </div>
      </div>

    </section>
  );
}
