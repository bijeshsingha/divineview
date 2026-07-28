import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PortalFooter from "@/components/PortalFooter";
import BookingFlow from "@/components/BookingFlow";

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#FDFBF7] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">Loading booking engine...</div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
      <PortalFooter />
    </>
  );
}
