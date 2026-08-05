import Image from "next/image";

const PLACES = [
  {
    id: 1,
    title: "Kamakhya Temple",
    category: "Spiritual",
    distance: "7.5 km",
    image: "/images/guwahati.jpg", // fallback
  },
  {
    id: 2,
    title: "Brahmaputra River Heritage",
    category: "Leisure",
    distance: "2.0 km",
    image: "/images/guwahati-bg.png", // fallback
  },
  {
    id: 3,
    title: "Gateway to Meghalaya",
    category: "Nature",
    distance: "100 km",
    image: "/images/meghalaya.jpg", // fallback
  },
  {
    id: 4,
    title: "Assam State Museum",
    category: "Culture",
    distance: "1.5 km",
    image: "/images/hero.jpg", // fallback
  },
];

export default function ExploreNearby() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-secondary font-medium tracking-[0.3em] uppercase mb-4 block">
          Location
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          Explore Nearby
        </h2>
        <div className="w-16 h-[2px] bg-secondary mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Step out and discover the vibrant culture, spiritual landmarks, and natural beauty surrounding our properties.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACES.map((place) => (
            <div 
              key={place.id} 
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <Image 
                src={place.image} 
                alt={place.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-secondary/90 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-md backdrop-blur-sm">
                  {place.category}
                </span>
                <h3 className="text-2xl font-serif text-white font-bold leading-tight mb-2">
                  {place.title}
                </h3>
                <p className="text-gray-300 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <svg className="w-4 h-4 mr-1.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {place.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
