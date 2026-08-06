import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

type PackageData = {
  id: string;
  title: string;
  target: string;
  offer: string;
  value: string;
  properties: ("divine-view" | "ambarish")[];
  popular?: boolean;
};

const PACKAGES: PackageData[] = [
  {
    id: "northeast-explorer",
    title: "The Northeast Explorer",
    target: "Tourists wanting a hassle-free vacation.",
    offer: "A 2-night stay at Hotel Divine View + a 1-Day Pooled Tour to Meghalaya via Divine View Tours.",
    value: "Book one package and your entire itinerary is secured. No haggling with local cabs.",
    properties: ["divine-view"],
    popular: true,
  },
  {
    id: "ambarish-unwind",
    title: "The Ambarish Unwind",
    target: "Couples, staycationers, and weary business travelers.",
    offer: "A 1-night stay in an Executive Room + a 45-minute spa session + a complimentary drink or 15% discount at the lounge.",
    value: "Experience our full-service capabilities without leaving the building.",
    properties: ["ambarish"],
  },
  {
    id: "corporate-hub",
    title: "The Corporate Hub",
    target: "Sales professionals and corporate travelers.",
    offer: "Priority early check-in/late check-out, guaranteed high-speed Wi-Fi, and a 2-piece express laundry service.",
    value: "Frictionless business travel prioritizing speed and reliability.",
    properties: ["divine-view", "ambarish"],
  },
];

export default function PackagesSection({ hotel = "all" }: { hotel?: "all" | "divine-view" | "ambarish" }) {
  const displayedPackages = PACKAGES.filter((p) => hotel === "all" || p.properties.includes(hotel));

  if (displayedPackages.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
            Special Offers
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Curated Packages
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elevate your stay with our exclusive bundles designed to give you the best experience and unbeatable value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {displayedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl p-8 flex flex-col shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                pkg.popular ? "border-primary" : "border-transparent"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{pkg.title}</h3>
              <p className="text-sm font-medium text-secondary mb-6">{pkg.target}</p>
              
              <div className="flex-grow">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">The Offer</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{pkg.offer}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">The Value</h4>
                  <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-3">
                    "{pkg.value}"
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={hotel === "ambarish" ? "/ambarish/book" : "/divine-view/book"}
                  className={`block w-full text-center px-6 py-3 rounded-full font-bold transition-colors ${
                    pkg.popular
                      ? "bg-primary hover:bg-primary-dark text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Book This Package
                </Link>
                <p className="text-xs text-center text-gray-400 mt-3">
                  Call our front desk to add this package to your reservation.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
