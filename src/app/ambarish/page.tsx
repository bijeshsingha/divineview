import PortalNavbar from "@/components/PortalNavbar";
import AmbarishFooter from "@/components/AmbarishFooter";
import MenuModal from "@/components/MenuModal";
import Image from "next/image";
import Link from "next/link";
import PackagesSection from "@/components/PackagesSection";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function AmbarishPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-grow bg-white">
        
        {/* HERO SECTION - FULL PAGE */}
        <section className="relative h-screen min-h-[600px] w-full">
          <Image src="/images/ambarish/building1.jpeg" alt="Hotel Ambarish Grand Residency" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <p className="text-sm md:text-base text-secondary font-medium tracking-[0.3em] uppercase mb-4 drop-shadow-md">Welcome to</p>
            <h1 className="sr-only">Hotel Ambarish Grand Residency</h1>
            <div className="relative w-[90vw] max-w-4xl h-32 md:h-48 lg:h-64 mb-6 drop-shadow-2xl">
              <Image src="/images/ambarish-logo.png" alt="Hotel Ambarish Grand Residency" fill className="object-contain" priority />
            </div>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl text-center font-light mb-10 tracking-wide">A Signature Premium Retreat in the Heart of Guwahati</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#rooms" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium text-lg transition-transform transform hover:-translate-y-1 shadow-lg text-center tracking-wide">View Our Rooms</a>
              <a href="#dining" className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors shadow-lg text-center tracking-wide">Explore Dining</a>
            </div>
          </div>
        </section>

        {/* ROOMS SECTION */}
        <section id="rooms" className="py-20 md:py-32 bg-stone-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Accommodation</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Signature Rooms</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">Indulge in understated elegance. Our carefully curated rooms feature premium bedding, rich wood accents, and dedicated 24/7 service designed for total relaxation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Deluxe Double Room */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 flex flex-col group border border-stone-700/50">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src="/images/ambarish/room1.jpeg" alt="Deluxe Double Room" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors duration-700">Deluxe Double Room</h3>
                  <p className="text-gray-400 mb-6 text-sm uppercase tracking-wide">1 double bed • Free cancellation</p>
                  <div className="text-4xl font-bold text-white mb-8 mt-auto">
                    ₹2,678<span className="text-base text-gray-400 font-normal">/night</span>
                  </div>
                  <Link href="/ambarish/rooms/deluxe-double" className="block w-full text-center bg-stone-900 hover:bg-primary text-white border border-stone-700 hover:border-primary px-6 py-4 rounded-full font-medium transition-all duration-700 tracking-wider uppercase text-sm">View Details</Link>
                </div>
              </div>

              {/* Standard Double Room */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 flex flex-col group border border-stone-700/50">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src="/images/ambarish/room2.jpeg" alt="Standard Double Room" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors duration-700">Standard Double Room</h3>
                  <p className="text-gray-400 mb-6 text-sm uppercase tracking-wide">1 double bed • Free cancellation</p>
                  <div className="text-4xl font-bold text-white mb-8 mt-auto">
                    ₹3,124<span className="text-base text-gray-400 font-normal">/night</span>
                  </div>
                  <Link href="/ambarish/rooms/standard-double" className="block w-full text-center bg-stone-900 hover:bg-primary text-white border border-stone-700 hover:border-primary px-6 py-4 rounded-full font-medium transition-all duration-700 tracking-wider uppercase text-sm">View Details</Link>
                </div>
              </div>

              {/* Suite */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 flex flex-col group border border-stone-700/50">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src="/images/ambarish/room3.jpeg" alt="Suite" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors duration-700">Suite</h3>
                  <p className="text-gray-400 mb-6 text-sm uppercase tracking-wide">Premium Suite • Free cancellation</p>
                  <div className="text-4xl font-bold text-white mb-8 mt-auto">
                    ₹3,749<span className="text-base text-gray-400 font-normal">/night</span>
                  </div>
                  <Link href="/ambarish/rooms/suite" className="block w-full text-center bg-stone-900 hover:bg-primary text-white border border-stone-700 hover:border-primary px-6 py-4 rounded-full font-medium transition-all duration-700 tracking-wider uppercase text-sm">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PackagesSection hotel="ambarish" />

        {/* RESTAURANT - SPLIT SCREEN */}
        <section id="dining" className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
          <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-1">
            <Image src="/images/ambarish/restaurant2.jpeg" alt="Restaurant" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-24 lg:p-32 order-2 lg:order-2 bg-gray-900 text-white">
            <span className="text-amber-200 font-bold tracking-widest uppercase text-sm mb-4 block">Dining</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Elevated Multi-Cuisine Dining</h2>
            <div className="w-16 h-1 bg-secondary mb-10"></div>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed font-light">
              Begin your morning with an indulgent, complimentary breakfast spread prepared by our master chefs. As the evening sets in, our dining room transforms into a sophisticated venue offering a reimagined multi-cuisine menu with exquisite, uninterrupted table service. Let the flavors take you on a journey.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
              <li className="flex items-center"><span className="text-secondary mr-4 text-xl">✦</span> Multi-Cuisine Menu</li>
              <li className="flex items-center"><span className="text-secondary mr-4 text-xl">✦</span> Exquisite Table Service</li>
            </ul>
            
            <MenuModal menuUrl="/menu-ambarish.pdf" hotelName="Hotel Ambarish Grand Residency" />
          </div>
        </section>

        {/* BAR - SPLIT SCREEN (REVERSED) */}
        <section id="bar" className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
          <div className="flex flex-col justify-center p-12 md:p-24 lg:p-32 order-2 lg:order-1">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Lounge</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">The Signature Lounge</h2>
            <div className="w-16 h-1 bg-primary mb-10"></div>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
              Retreat into the ambient warmth of our fully-stocked Bar. With mood lighting and an impossibly relaxed atmosphere, it is your private sanctuary to unwind. Sip on our signature, hand-crafted cocktails while the quiet jazz and sophisticated service melt the city noise away.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
              <li className="flex items-center"><span className="text-primary mr-4 text-xl">◇</span> Fully-Stocked Bar</li>
              <li className="flex items-center"><span className="text-primary mr-4 text-xl">◇</span> Social Hour</li>
              <li className="flex items-center"><span className="text-primary mr-4 text-xl">◇</span> Signature Cocktails</li>
            </ul>
          </div>
          <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-2">
            <Image src="/images/ambarish/bar1.png" alt="Hotel Bar" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </section>

        {/* BANQUET - SPLIT SCREEN */}
        <section id="events" className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
          <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-1">
            <Image src="/images/ambarish/meeting room1.jpeg" alt="Banquet & Meeting Hall" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-24 lg:p-32 order-2 lg:order-2 bg-gray-900 text-white">
            <span className="text-amber-200 font-bold tracking-widest uppercase text-sm mb-4 block">Events</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Grand Events & Banquets</h2>
            <div className="w-16 h-1 bg-secondary mb-10"></div>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed font-light">
              Whether hosting an intimate corporate retreat or a magnificent celebration, our expansive, meticulously designed banquet halls provide the perfect canvas. We pair opulent surroundings with flawless, full-service catering to ensure your event is truly unforgettable.
            </p>
            
            <ul className="space-y-6 text-gray-200">
              <li className="flex items-start">
                <span className="text-amber-200 mr-4 text-2xl mt-1">✦</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Corporate Meeting Rooms</h3>
                  <p className="text-gray-400 font-light">Equipped for productivity.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-200 mr-4 text-2xl mt-1">✦</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Spacious Banquet Hall</h3>
                  <p className="text-gray-400 font-light">Perfect for large celebrations.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-200 mr-4 text-2xl mt-1">✦</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Event Catering Options</h3>
                  <p className="text-gray-400 font-light">Tailored menus for your guests.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* SPA - SPLIT SCREEN (REVERSED) */}
        <section id="spa" className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f9f7f4]">
          <div className="flex flex-col justify-center p-12 md:p-24 lg:p-32 order-2 lg:order-1">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Wellness</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Wellness & Retreat</h2>
            <div className="w-16 h-1 bg-primary mb-10"></div>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed font-light">
              Step into a sanctuary of tranquility. Our reimagined spa services offer bespoke, full-service therapies designed to dissolve tension and restore balance. Surrender to the expert touch of our therapists in a deeply serene environment, crafted entirely for your indulgence.
            </p>
            
            <ul className="space-y-6 text-gray-800">
              <li className="flex items-start">
                <span className="text-primary mr-4 text-2xl mt-1">❀</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Relaxing Spa Treatments</h3>
                  <p className="text-gray-500 font-light">Custom therapies to melt stress away.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 text-2xl mt-1">❀</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Professional Therapists</h3>
                  <p className="text-gray-500 font-light">Expert care for your wellbeing.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 text-2xl mt-1">❀</span>
                <div>
                  <h3 className="font-bold text-xl mb-1">Peaceful Environment</h3>
                  <p className="text-gray-500 font-light">A serene escape from the city.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-2">
            <Image src="/images/ambarish/spa1.png" alt="Spa and Wellness" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </section>

        {/* AMENITIES - FULL PAGE */}
        <section className="min-h-screen py-24 bg-gray-50 flex items-center px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Features</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Hotel Amenities</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-6">🌟</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Popular</h3>
                <ul className="space-y-4 text-gray-600 font-light">
                  <li className="flex items-center">✓ Free Wi-Fi</li>
                  <li className="flex items-center">✓ Free Self Parking</li>
                  <li className="flex items-center">✓ Free Breakfast</li>
                  <li className="flex items-center">✓ Air Conditioning</li>
                  <li className="flex items-center">✓ Child-Friendly</li>
                  <li className="flex items-center">✓ Pet-Friendly (extra charge)</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-2xl mb-6">🛎️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Services</h3>
                <ul className="space-y-4 text-gray-600 font-light">
                  <li className="flex items-center">✓ 24-hour Front desk</li>
                  <li className="flex items-center">✓ Baggage storage</li>
                  <li className="flex items-center">✓ Full-service laundry</li>
                  <li className="flex items-center">✓ Wake up calls</li>
                  <li className="flex items-center">✓ Accessible Lift</li>
                  <li className="flex items-center">✓ English & Hindi spoken</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-6">🚗</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Transport</h3>
                <ul className="space-y-4 text-gray-600 font-light">
                  <li className="flex items-center">✓ Free Parking Onsite</li>
                  <li className="flex items-center">✓ Local Shuttle</li>
                  <li className="flex items-center">✓ Airport Shuttle</li>
                  <li className="flex items-center">✓ Car rental onsite</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-2xl mb-6">🚿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Rooms</h3>
                <ul className="space-y-4 text-gray-600 font-light">
                  <li className="flex items-center">✓ Private bathroom</li>
                  <li className="flex items-center">✓ Bathtub in some rooms</li>
                  <li className="flex items-center">✓ Shower</li>
                  <li className="flex items-center">✓ Daily Housekeeping</li>
                  <li className="flex items-center">✓ Turndown service</li>
                  <li className="flex items-center">✓ Tea/coffee facilities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AmbarishFooter />
      <WhatsAppFAB phoneNumber="+918822041211" />
    </>
  );
}
