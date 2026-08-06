"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFAB({ phoneNumber }: { phoneNumber?: string }) {
  const link = getWhatsAppLink(
    "Hello, I'm interested in booking a stay. Could you please share more details?",
    phoneNumber
  );

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
        }
        .wa-fab { animation: waPulse 2.5s ease-in-out infinite; }
      `}</style>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="wa-fab fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] transition-colors duration-300 shadow-xl hover:shadow-2xl"
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.853 6.64L2.667 29.333l6.88-1.813A13.28 13.28 0 0016.003 29.333c7.36 0 13.333-5.973 13.333-13.333S23.363 2.667 16.003 2.667zm0 24c-2.147 0-4.267-.573-6.107-1.653l-.44-.267-4.08 1.08 1.093-4-.293-.453A10.613 10.613 0 015.333 16c0-5.88 4.787-10.667 10.667-10.667S26.667 10.12 26.667 16 21.88 26.667 16.003 26.667zm5.853-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.947 1.253-.12.213-.24.24-.56.08s-1.093-.4-2.08-1.28c-.773-.68-1.293-1.52-1.44-1.84-.16-.32-.013-.493.12-.653.12-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.533-.187 0-.4-.027-.613-.027s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.467 4.827.76.32 1.36.52 1.827.667.76.24 1.453.213 2 .133.613-.08 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </a>
    </>
  );
}
