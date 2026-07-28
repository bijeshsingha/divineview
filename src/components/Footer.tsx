import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <span className="font-serif text-2xl font-bold text-white block mb-4">
              Hotel Divine View
            </span>
            <p className="text-sm">
              Your gateway to the Northeast. Clean, affordable, and centrally located in Paltan Bazar, Guwahati.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/divine-view#rooms" className="hover:text-primary transition-colors">Rooms & Tariff</Link></li>
              <li><Link href="/divine-view#facilities" className="hover:text-primary transition-colors">Facilities</Link></li>
              <li><Link href="/#explore" className="hover:text-primary transition-colors">Explore Tours</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Paltan Bazar, Near Guwahati Railway Station</p>
              <p>Guwahati, Assam, India</p>
              <p>
                <a href="tel:06901741211" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📞</span> 069017 41211
                </a>
              </p>
              <p className="pt-2">
                <a href="mailto:divineview02@gmail.com" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">✉️</span> divineview02@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-gray-800 mb-12">
          <iframe 
            src="https://maps.google.com/maps?q=Hotel%20Divine%20View,%20Paltan%20Bazaar,%20Guwahati&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Divine View Location"
          ></iframe>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Hotel Divine View. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for a beautiful Northeast experience.</p>
        </div>
      </div>
    </footer>
  );
}
