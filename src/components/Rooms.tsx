import Image from "next/image";
import Link from "next/link";
import { ROOMS } from "@/data/rooms";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export default function Rooms() {
  return (
    <section id="rooms" className="scroll-mt-20 bg-white min-h-[calc(100vh-5rem)] flex flex-col relative pt-16 md:pt-24 pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 tracking-tight">
            Smart & Essential Rooms
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Fast, frictionless, and exceptionally clean. Designed for travelers who value efficiency and a prime connected location.
          </p>
        </div>

        {/* Special Offer Banner */}
        <div className="mb-6 bg-secondary text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between transform transition hover:scale-[1.01]">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Special Offer!</h3>
            <p className="text-secondary-dark font-medium bg-white/20 inline-block px-3 py-1 rounded-md">
              Use Coupon Code <span className="font-bold font-mono text-white">SM30OF</span> for a 30% Discount!
            </p>
          </div>
          <Button
            href="/divine-view/book"
            variant="outline"
            className="bg-white text-secondary hover:bg-gray-100 border-none shadow-sm rounded-full px-6 py-3 font-bold"
          >
            Claim Offer
          </Button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ROOMS.map((room, idx) => {
            return (
              <Card
                key={room.id}
                className="overflow-hidden flex flex-col"
                hoverEffect
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={room.heroImage}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={idx < 4}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    {room.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-4 mt-auto">
                    Rs. {room.price}<span className="text-sm text-gray-500 font-normal">/night</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      href={`/divine-view/rooms/${room.id}`}
                      variant="outline"
                      fullWidth
                    >
                      View Details
                    </Button>
                    <Button
                      href={`/divine-view/book?room=${room.id}`}
                      variant="primary"
                      fullWidth
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>


    </section>
  );
}

