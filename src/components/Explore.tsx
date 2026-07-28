import Image from "next/image";

const PACKAGES = [
  {
    id: "readymade",
    title: "Readymade Tour Packages",
    description: "Hassle-free, pre-designed itineraries. We handle everything from the vehicle to the stays and driver allowances, covering prime spots across Assam, Meghalaya, and Arunachal.",
    image: "/images/readymade-tour.jpg",
  },
  {
    id: "custom",
    title: "Custom Itineraries",
    description: "For the seasoned traveler. You pick the places—from the valleys of Tawang to the roots bridges of Cherrapunji—and we calculate the optimal route, days, and cost.",
    image: "/images/custom-tour.jpg",
  },
];

export default function Explore() {
  return (
    <section id="explore" className="relative min-h-screen flex items-center justify-center bg-[url('/images/tours-bg.jpg')] bg-fixed bg-cover bg-center py-20">
      
      {/* Light elegant overlay for parallax effect */}
      <div className="absolute inset-0 bg-[#FDFBF7]/90 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm md:text-base text-secondary font-medium tracking-[0.3em] uppercase mb-4">
            Discover
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 drop-shadow-sm">
            Divine View Tours
          </h2>
          <div className="w-16 h-[2px] bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
            Make our properties your base camp for regional tourism. Check out our exclusive readymade itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className="group bg-white/60 border border-white/40 rounded-2xl overflow-hidden hover:bg-white/80 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-md flex flex-col md:flex-row transform hover:-translate-y-1"
              >
                <div className="relative h-64 md:h-auto md:w-2/5 flex-shrink-0">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 font-light">
                      {pkg.description}
                    </p>
                  </div>
                  <a
                    href="https://divineviewtours.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary hover:text-primary-dark font-medium transition-colors group-hover:underline decoration-2 underline-offset-4 uppercase text-sm tracking-wider"
                  >
                    View Itinerary
                    <svg
                      className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
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
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Subtle Next Section Arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center z-20">
        <a href="#founders" aria-label="Scroll to Founders" className="text-secondary opacity-80 hover:opacity-100 transition-opacity">
          <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
