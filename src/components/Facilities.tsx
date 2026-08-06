import {
  Wind,
  Tv,
  Wifi,
  Phone,
  Stethoscope,
  Newspaper,
  CarFront,
  Map,
  Sparkles,
  Utensils,
  Zap,
  Shirt,
  Droplet
} from "lucide-react";

export default function Facilities() {
  const amenities = [
    { name: "Air Condition Rooms", icon: Wind },
    { name: "Television with Satellite Channels", icon: Tv },
    { name: "Free Internet / Broadband / Wifi", icon: Wifi },
    { name: "Telephone", icon: Phone },
    { name: "Doctor on Call", icon: Stethoscope },
    { name: "Newspaper", icon: Newspaper },
    { name: "Free Car Parking", icon: CarFront },
    { name: "Car Rental / Travel Assistance", icon: Map },
    { name: "24 Hr Housekeeping", icon: Sparkles },
    { name: "Multi Cuisine Room Service", icon: Utensils },
    { name: "Generator (24 Hr Power Backup)", icon: Zap },
    { name: "Laundry Service", icon: Shirt },
    { name: "24 Hr. Hot/Cold Water in bathroom", icon: Droplet },
  ];

  return (
    <section id="facilities" className="scroll-mt-20 bg-white min-h-[calc(100vh-5rem)] flex flex-col relative pt-16 md:pt-24 pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 tracking-tight">
            Frictionless Amenities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Stay connected and productive with high-speed internet, seamless service, and everything you need on demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-gray-800 font-medium">{amenity.name}</span>
            </div>
            );
          })}
        </div>
      </div>
      

    </section>
  );
}
