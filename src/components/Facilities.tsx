export default function Facilities() {
  const amenities = [
    "Air Condition Rooms",
    "Television with Satellite Channels",
    "Free Internet / Broadband / Wifi",
    "Telephone",
    "Doctor on Call",
    "Newspaper",
    "Free Car Parking",
    "Car Rental / Travel Assistance",
    "24 Hr Housekeeping",
    "Multi Cuisine Room Service",
    "Generator (24 Hr Power Backup)",
    "Laundry Service",
    "24 Hr. Hot/Cold Water in bathroom",
  ];

  return (
    <section id="facilities" className="scroll-mt-20 bg-white min-h-[calc(100vh-5rem)] flex flex-col relative pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Facilities & Amenities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for a comfortable and memorable stay in Guwahati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-800 font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Next Section Arrow */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
        <a href="#reviews" aria-label="Scroll to Reviews" className="text-gray-400 hover:text-primary transition-colors">
          <svg className="w-10 h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
