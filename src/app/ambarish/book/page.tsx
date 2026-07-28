import { Suspense } from "react";
import AmbarishNavbar from "@/components/AmbarishNavbar";
import AmbarishFooter from "@/components/AmbarishFooter";
import BookingFlow from "@/components/BookingFlow";

export default function AmbarishBookPage() {
  return (
    <>
      <AmbarishNavbar />
      <main className="flex-grow bg-[#FDFBF7] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">Loading booking engine...</div>}>
            <BookingFlow hotel="ambarish" />
          </Suspense>
        </div>
      </main>
      <AmbarishFooter />
    </>
  );
}
