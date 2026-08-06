"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function BackgroundMedia({
  src, alt, type = "image",
}: {
  src: string; alt?: string; type?: "image" | "video";
}) {
  if (type === "video") {
    return (
      <video autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
    >
      <Image src={src} alt={alt ?? ""} fill quality={90} className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw" />
    </div>
  );
}

const nodes = [
  {
    number: "01",
    label: "Our Humble Beginnings",
    heading: "Our Humble Beginnings.",
    body: "We didn't start out in big corporate offices. We started right here on the ground in Guwahati. Bidyut worked his way up from being a hotel receptionist, and Bablu ran a busy, local Manipuri restaurant in Paltan Bazaar. By greeting guests and serving good food every single day, we learned exactly what people need when they travel. We know the value of a warm welcome because that is how we built our lives.",
    src: "/images/reception-3.jpg",
    alt: "Hotel reception desk — where it all began",
    type: "image" as const,
  },
  {
    number: "02",
    label: "Growing With You",
    heading: "Growing With You.",
    body: "We took all those years of daily, hands-on experience and created the Divine View Group. We know that when you travel, you want a clean room, a fair price, and a safe location near the station. That is why we built Hotel Divine View for a comfortable stay. Recently, we also took over Hotel Ambarish Grand Residency—a 3-star hotel with a restaurant, bar, and event halls—fully upgraded and run with the genuine care our guests trust us for.",
    src: "/images/ambarish/bar1.png",
    alt: "Ambarish Grand Residency lounge",
    type: "image" as const,
  },
  {
    number: "03",
    label: "Exploring the Northeast",
    heading: "Exploring the Northeast.",
    body: "Our connection to you goes beyond just giving you a room. Since we are locals from Assam, we know this region inside out. With Divine View Tours, we organize safe, easy, and family-friendly trips to places like Meghalaya. From cars to sightseeing, we handle all the planning so you can just relax and enjoy the real beauty of the Northeast with people you can trust.",
    src: "/images/kaziranga-rhino.jpg",
    alt: "Meghalaya hills at twilight",
    type: "image" as const,
  },
];

const founders = [
  {
    name: "Bidyut Singha",
    role: "Partner",
    image: "/images/bidyut-updated1.png",
    bio: "Starting as a hotel receptionist in Guwahati, Bidyut's relentless work ethic and dedication to guest relations propelled him to General Manager. Today, he leverages his deep operational expertise to co-found Divine View Group and deliver exceptional hospitality.",
    socials: [
      { name: "Facebook", url: "#", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Instagram", url: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    ],
  },
  {
    name: "Bablu Singha",
    role: "Partner",
    image: "/images/hero.jpg",
    bio: "With a strong entrepreneurial drive, Bablu founded a beloved Manipuri restaurant in Paltan Bazaar. This venture fostered a profound understanding of authentic culinary experiences, paving the way for his partnership with Bidyut to build Divine View Group.",
    socials: [
      { name: "Facebook", url: "#", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Instagram", url: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    ],
  },
];

function TimelineNode({ node, index }: { node: typeof nodes[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}
      className={`relative flex flex-col md:flex-row items-stretch transition-all duration-1000 ease-out min-h-[50vh] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      {/* Media Panel */}
      <div className={`relative w-full md:w-[58%] overflow-hidden flex-shrink-0 min-h-[300px] md:min-h-full ${isEven ? "md:order-1" : "md:order-2"}`}>
        <BackgroundMedia src={node.src} alt={node.alt} type={node.type} />
        <div className={`absolute inset-0 z-10 ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent via-[#0f0e0c]/20 to-[#0f0e0c]/90 hidden md:block`} />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f0e0c] via-transparent to-transparent md:hidden" />
        <span className={`absolute bottom-4 z-20 font-serif text-[clamp(4rem,10vw,9rem)] leading-none font-black text-[#B5552A]/20 pointer-events-none transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"} ${isEven ? "right-4" : "left-4"}`}>
          {node.number}
        </span>
      </div>

      {/* Text Panel */}
      <div className={`relative z-20 flex flex-col justify-center bg-[#0f0e0c] px-8 py-16 md:px-14 md:py-24 w-full md:w-[42%] ${isEven ? "md:order-2" : "md:order-1"}`}>
        <div className={`absolute top-0 w-[2px] bg-[#B5552A] transition-all duration-1000 ease-out ${isEven ? "left-0" : "right-0"}`}
          style={{ height: visible ? "100%" : "0%", transitionDelay: "200ms" }}
        />
        
        <div className="max-w-xl mx-auto w-full">
          <p className={`text-[10px] tracking-[0.4em] uppercase text-[#B5552A] font-semibold mb-5 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: "300ms" }}>
            Chapter {node.number}
          </p>
          <h3 className={`font-serif text-3xl md:text-[2.6rem] font-bold text-white mb-5 leading-snug transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ fontFamily: "'Playfair Display', Georgia, serif", transitionDelay: "400ms" }}>
            {node.heading}
          </h3>
          <div className={`h-[2px] bg-[#B5552A] mb-7 transition-all duration-700 ease-out`} style={{ width: visible ? "40px" : "0px", transitionDelay: "500ms" }} />
          <p className={`text-gray-400 leading-relaxed text-base md:text-lg font-light transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontFamily: "'Inter', sans-serif", transitionDelay: "600ms" }}>
            {node.body}
          </p>
          <div className={`mt-10 inline-flex items-center gap-3 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "700ms" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#B5552A]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600">{node.number} of 03</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </div>
  );
}

function FounderCard({ founder, index }: { founder: typeof founders[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-[#111827] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B5552A]/40 shadow-xl hover:shadow-2xl hover:shadow-[#B5552A]/10 transition-all duration-500 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative h-72 w-full bg-gray-800 overflow-hidden">
        <Image src={founder.image} alt={founder.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
      </div>
      <div className="p-7 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {founder.name}
          </h3>
          <p className="text-[#B5552A] font-medium text-xs tracking-wider uppercase">{founder.role}</p>
        </div>
        <div className="w-8 h-[2px] bg-[#B5552A] mb-4" />
        <p className="text-gray-400 leading-relaxed text-sm font-light flex-grow">{founder.bio}</p>
        <div className="flex gap-4 mt-6">
          {founder.socials.map((s) => (
            <a key={s.name} href={s.url} className="text-gray-600 hover:text-[#B5552A] transition-colors duration-300" aria-label={s.name}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.icon} /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function JourneyScroll() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.0) translate(0px, 0px); }
          to   { transform: scale(1.08) translate(-8px, -4px); }
        }
      `}</style>

      <section className="bg-[#0f0e0c] scroll-mt-20">
        {/* Intro Header */}
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto px-6 pt-24 pb-16 text-center transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#B5552A] font-medium mb-5">
            Our Story
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Journey Scroll
          </h2>
          <div className="w-12 h-[2px] bg-[#B5552A] mx-auto" />
        </div>

        {/* Normal Document Flow Chapters */}
        <div className="flex flex-col w-full">
          {nodes.map((node, i) => (
            <TimelineNode key={node.number} node={node} index={i} />
          ))}
        </div>

        {/* Founders Section */}
        <div className="relative bg-[#0a0908] py-24 px-4 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#B5552A]/50 to-transparent" />
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#B5552A] font-semibold mb-4">
                The People Behind It
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Meet the Founders
              </h2>
              <div className="w-10 h-[2px] bg-[#B5552A] mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {founders.map((f, i) => (
                <FounderCard key={f.name} founder={f} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
