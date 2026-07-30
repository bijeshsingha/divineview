"use client";

import { useState, useEffect } from "react";

export default function MenuModal({ 
  menuUrl, 
  hotelName 
}: { 
  menuUrl: string, 
  hotelName: string 
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="mt-6 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md flex items-center justify-center mx-auto lg:mx-0"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        View Restaurant Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xl font-serif font-bold text-gray-900">{hotelName} - Dining Menu</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                aria-label="Close Menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="flex-grow w-full bg-gray-100 overflow-hidden relative">
              <iframe 
                src={`${menuUrl}#toolbar=0`} 
                className="absolute inset-0 w-full h-full border-none"
                title="Restaurant Menu"
              />
            </div>
            
            {/* Footer / Download Option */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
              <a 
                href={menuUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-medium underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
