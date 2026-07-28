import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AmbarishComingSoon() {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-20rem)] bg-gray-50 py-20 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Hotel Ambarish Grand Residency
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Our new digital experience is currently under construction. Please check back soon for updates!
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
