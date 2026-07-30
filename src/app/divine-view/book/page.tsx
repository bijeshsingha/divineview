import { Suspense } from "react";
import dynamic from "next/dynamic";
import DivineViewNavbar from "@/components/DivineViewNavbar";
import Footer from "@/components/Footer";

const BookingFlow = dynamic(() => import("@/components/BookingFlow"));

export default function BookPage() {
  return (
    <>
      <DivineViewNavbar />
      <main className="flex-grow bg-[#FDFBF7] py-8 md:py-12 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">Complete Your Booking</h1>
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">Loading booking engine...</div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
