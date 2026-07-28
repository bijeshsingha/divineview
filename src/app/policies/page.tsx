import PortalNavbar from "@/components/PortalNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PoliciesPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-grow bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Reservation & Cancellation Policy
            </h1>
            <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Please read our policies carefully before making a reservation. These apply to both Hotel Divine View and Hotel Ambarish Grand Residency unless otherwise stated.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* 1. Reservation Policy */}
            <div className="p-8 md:p-10 border-b border-gray-100">
              <div className="flex items-center mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-xl mr-4">1</span>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Reservation Policy</h2>
              </div>
              <ul className="space-y-6 text-gray-700">
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Check-in / Check-out</span>
                  <div className="md:w-2/3">
                    <p><strong>Hotel Divine View:</strong> Check-in at 12:00 PM | Check-out at 11:00 AM</p>
                    <p className="mt-1"><strong>Hotel Ambarish Grand Residency:</strong> Check-in at 1:00 PM | Check-out at 12:00 PM</p>
                    <p className="text-sm text-gray-500 mt-2">Early check-in or late check-out is subject to availability and may incur additional charges.</p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Identification</span>
                  <div className="md:w-2/3">
                    A valid Government-issued photo ID (Aadhar Card, Passport, Driving License, or Voter ID) is required at check-in for all guests. <strong>Note:</strong> PAN cards are not accepted as valid ID proof.
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Age Requirement</span>
                  <div className="md:w-2/3">
                    The primary guest checking in must be at least 18 years old.
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Advance Payment</span>
                  <div className="md:w-2/3">
                    A minimum 50% advance payment is required to confirm the booking. Full payment must be settled upon check-in.
                  </div>
                </li>
              </ul>
            </div>

            {/* 2. Cancellation & Refund Policy */}
            <div className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary font-bold text-xl mr-4">2</span>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Cancellation & Refund Policy</h2>
              </div>
              <ul className="space-y-6 text-gray-700">
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Free Cancellation</span>
                  <div className="md:w-2/3">
                    Cancellations made <strong>72 hours (3 days) or more</strong> prior to the check-in date will receive a 100% refund.
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Partial Charge</span>
                  <div className="md:w-2/3">
                    Cancellations made <strong>between 72 hours and 24 hours</strong> prior to check-in will incur a charge equivalent to 1 night&apos;s stay.
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Late Cancellation / No Show</span>
                  <div className="md:w-2/3">
                    Cancellations made <strong>less than 24 hours</strong> before check-in, or in the case of a no-show, will incur a 100% cancellation fee (no refund will be issued).
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Refund Processing</span>
                  <div className="md:w-2/3">
                    Approved refunds will be processed to the original method of payment within 5-7 business days.
                  </div>
                </li>
              </ul>
            </div>

            {/* 3. General Policies */}
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900/10 text-gray-900 font-bold text-xl mr-4">3</span>
                <h2 className="text-2xl font-serif font-bold text-gray-900">General Policies</h2>
              </div>
              <ul className="space-y-6 text-gray-700">
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Child Policy</span>
                  <div className="md:w-2/3">
                    Children under 8 years of age can stay free of charge when using existing bedding. Extra beds will incur additional charges.
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Pet Policy</span>
                  <div className="md:w-2/3">
                    <p><strong>Hotel Ambarish Grand Residency:</strong> Pet-friendly (subject to additional charges and prior intimation).</p>
                    <p className="mt-1"><strong>Hotel Divine View:</strong> Pets are strictly not allowed.</p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start">
                  <span className="font-bold text-gray-900 md:w-1/3 mb-1 md:mb-0">Right of Admission</span>
                  <div className="md:w-2/3">
                    The management reserves the right of admission. Admission may be denied if suitable identification is not provided or if guests behave in a disorderly manner. Local couples may be subject to specific admission policies.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Have any questions about our policies?</p>
            <Link href="/#contact" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
