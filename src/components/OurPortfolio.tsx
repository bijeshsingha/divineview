import Image from "next/image";
import Link from "next/link";

const hotels = [
  {
    name: "Hotel Divine View",
    tagline: "Your Stay in the Northeast",
    location: "Paltan Bazaar, Guwahati",
    description:
      "Comfortable, clean rooms in a prime location near the railway station. The perfect base for exploring Guwahati and beyond.",
    href: "/divine-view",
    logo: "/images/hdv-icon-only.png",
    image: "/images/hero.jpg",
    badge: "Hotel",
  },
  {
    name: "Ambarish Grand Residency",
    tagline: "3-Star Comfort & Elegance",
    location: "Paltan Bazaar, Guwahati",
    description:
      "A fully-upgraded 3-star experience with a restaurant, bar, and event halls — run with the genuine care our guests trust us for.",
    href: "/ambarish",
    logo: "/images/ambarish-logo.png",
    image: "/images/ambarish/building1.jpeg",
    badge: "Hotel",
  },
  {
    name: "Divine View Tours",
    tagline: "Explore the Northeast",
    location: "Meghalaya & Beyond",
    description:
      "Safe, easy, and family-friendly trips planned by local experts. From sightseeing to transportation, we handle the itinerary so you can relax.",
    href: "/#explore-parallax",
    logo: "/images/hdv-icon-only.png",
    image: "/images/meghalaya.jpg",
    badge: "Tours",
  },
];

export default function OurPortfolio() {
  return (
    <section id="our-portfolio" className="bg-[#111827] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#B5552A] font-medium mb-5">
            Explore Our Offerings
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Portfolio
          </h2>
          <div className="w-12 h-[2px] bg-[#B5552A] mx-auto" />
        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Link
              key={hotel.name}
              href={hotel.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#B5552A]/60 transition-all duration-500 bg-[#1F2937] shadow-xl hover:shadow-2xl hover:shadow-[#B5552A]/10"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Badge */}
                <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#B5552A] font-semibold mb-3">
                  {hotel.badge}
                </span>

                <h3
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {hotel.name}
                </h3>
                <p className="text-[#B5552A] text-sm font-medium mb-1">
                  {hotel.tagline}
                </p>
                <p className="text-gray-500 text-xs tracking-wider uppercase mb-4">
                  {hotel.location}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {hotel.description}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-[#B5552A] font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                  Explore & Book
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
