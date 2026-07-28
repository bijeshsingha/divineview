import { AMBARISH_ROOMS } from "@/data/ambarishRooms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AmbarishNavbar from "@/components/AmbarishNavbar";
import AmbarishFooter from "@/components/AmbarishFooter";

export async function generateStaticParams() {
  return AMBARISH_ROOMS.map((room) => ({
    id: room.id,
  }));
}

export default async function AmbarishRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = AMBARISH_ROOMS.find((r) => r.id === id);

  if (!room) {
    notFound();
  }

  return (
    <>
      <AmbarishNavbar />
      <main className="flex-grow bg-gray-50 pb-20">
        {/* Room Hero */}
        <div className="relative h-[60vh] min-h-[400px] w-full">
          <Image
            src={room.heroImage}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-center drop-shadow-md">
              {room.name}
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-sm max-w-2xl text-center">
              {room.shortDescription}
            </p>
          </div>
        </div>

        {/* Room Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 flex flex-col lg:flex-row gap-12">
            
            {/* Description & Amenities */}
            <div className="lg:w-2/3">
              <Link href="/ambarish#rooms" className="text-primary hover:underline mb-8 inline-flex items-center font-medium">
                &larr; Back to all rooms
              </Link>
              
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-4">
                About this Room
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-10">
                {room.longDescription}
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Room Amenities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-primary mr-3 text-xl">✓</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 sticky top-32 shadow-sm">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">₹ {room.price}</span>
                  <span className="text-gray-500"> / night</span>
                </div>
                
                <div className="space-y-4 mb-8 text-gray-700">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">Max Occupancy</span>
                    <span>{room.maxOccupancy}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">Check-in</span>
                    <span>1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">Check-out</span>
                    <span>12:00 PM</span>
                  </div>
                </div>

                <Link 
                  href={`/ambarish/book?room=${room.id}`}
                  className="block w-full text-center bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  Book Now
                </Link>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Guaranteed best rates when booking directly.
                </p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Room Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {room.gallery.map((img, idx) => (
                <div key={idx} className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src={img}
                    alt={`${room.name} - View ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AmbarishFooter />
    </>
  );
}
