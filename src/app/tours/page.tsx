import Link from "next/link";
import PortalNavbar from "@/components/PortalNavbar";
import PortalFooter from "@/components/PortalFooter";

export const metadata = {
  title: "Northeast Tours & Packages | Divine View Tours",
  description:
    "Explore curated, family-friendly tour packages to Meghalaya and across the Northeast, organized by Divine View Tours.",
};

export default function ToursPage() {
  return (
    <>
      <PortalNavbar />
      <main className="min-h-screen bg-[#0f0e0c] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#B5552A] font-medium mb-5">
            Divine View Tours
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Northeast Tour Packages
          </h1>
          <div className="w-12 h-[2px] bg-[#B5552A] mx-auto mb-8" />
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
            We are busy crafting handpicked itineraries to Meghalaya, Assam, and
            beyond. Check back soon — or reach out to us directly for a
            personalised package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.divineviewtours.com/explore/packages"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#B5552A] hover:bg-[#9B4423] text-white font-semibold rounded-full tracking-wider uppercase text-sm transition-all duration-300"
            >
              Browse on Tours Site →
            </a>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 border border-white/20 hover:border-white/50 text-white font-medium rounded-full tracking-wider uppercase text-sm transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <PortalFooter />
    </>
  );
}
