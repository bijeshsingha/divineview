"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PortalFooter from "@/components/PortalFooter";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("id");

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8 md:p-12 text-center border-t-8 border-green-600">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your payment was successful and your room is locked in our system. We look forward to hosting you in Guwahati!
      </p>

      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-left mb-8">
        <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Reservation ID</span>
          <span className="text-xl font-mono font-bold text-gray-900">{reservationId || "PENDING"}</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">A detailed receipt has been sent to your email address.</p>
        <p className="text-sm text-gray-600">Present this ID at the front desk during check-in.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => window.print()} className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors">
          Print Receipt
        </button>
        <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#FDFBF7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 font-medium">Loading confirmation details...</div>}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>
      <PortalFooter />
    </>
  );
}
