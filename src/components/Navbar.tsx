"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotel Divine View", href: "/divine-view" },
    { name: "Hotel Ambarish", href: "/ambarish" },
    { name: "Tours", href: "/#explore" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center z-[60]" onClick={() => setIsOpen(false)}>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-primary leading-none">
                  Divine View
                </span>
                <span className="text-[0.65rem] text-primary tracking-[0.25em] uppercase mt-0.5 font-medium">
                  Hotels & Tours
                </span>
              </div>
            </Link>

            {/* Elegant Hamburger Button (Always visible) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-primary-dark focus:outline-none p-2 z-[60] relative transition-transform duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-6 flex flex-col justify-between items-end">
                <span className={`h-[2px] bg-current transition-all duration-300 ease-in-out ${isOpen ? 'w-8 rotate-45 translate-y-[11px]' : 'w-8'}`} />
                <span className={`h-[2px] bg-current transition-all duration-300 ease-in-out ${isOpen ? 'w-0 opacity-0' : 'w-6'}`} />
                <span className={`h-[2px] bg-current transition-all duration-300 ease-in-out ${isOpen ? 'w-8 -rotate-45 -translate-y-[11px]' : 'w-4'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-20 px-4">
          <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            {navLinks.map((link, index) => {
              const isHashLink = link.href.includes("#");
              
              // Staggered animation effect
              const style = {
                transitionDelay: isOpen ? `${index * 75 + 100}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transitionProperty: 'all',
                transitionDuration: '500ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              };

              if (isHashLink) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={style}
                    className="text-3xl md:text-4xl font-serif text-gray-800 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={style}
                  className="text-3xl md:text-4xl font-serif text-gray-800 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div 
              className="mt-8 pt-10 border-t border-gray-200 w-full flex justify-center"
              style={{
                transitionDelay: isOpen ? `${navLinks.length * 75 + 200}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transitionProperty: 'all',
                transitionDuration: '500ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-xl transition-transform transform hover:-translate-y-1 shadow-lg hover:shadow-xl w-full text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
