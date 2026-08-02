import Image from "next/image";
import Link from "next/link";

export default function Hero() {

  return (
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/guwahati-bg.png"
          alt="Divine View Hotels"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
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
              <div className="relative w-72 md:w-80 h-24 md:h-32 -mt-2">
                <Image 
                  src="/images/hdv-logo-dark.png" 
                  alt="Hotel Divine View" 
                  fill 
                  className="object-contain drop-shadow-md" 
                />
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

      {/* Bouncing Down Arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#about" aria-label="Scroll down" className="text-white opacity-80 hover:opacity-100 transition-opacity">
          <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
