"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroBookingWidget() {
  const router = useRouter();
  
  const getTodayString = () => new Date().toISOString().split("T")[0];
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");
  const [guests, setGuests] = useState("1");

  const getMinCheckOut = () => {
    if (checkIn) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split("T")[0];
    }
    return getTodayString();
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    const params = new URLSearchParams({
      checkIn: checkIn,
      checkOut: checkOut,
      rooms: rooms,
      adults: guests
    });
    router.push(`/divine-view/book?${params.toString()}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl md:rounded-full shadow-2xl max-w-6xl mx-auto mt-8 relative z-20">
      <form onSubmit={handleBookNow} className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        
        {/* Check In */}
        <div className="flex flex-col items-center w-full md:flex-1 px-2">
          <label className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 whitespace-nowrap">Check In</label>
          <input
            required
            type="date"
            min={getTodayString()}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full max-w-[150px] bg-transparent border-b border-white/30 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white py-2 text-center [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-white/30"></div>
        
        {/* Check Out */}
        <div className="flex flex-col items-center w-full md:flex-1 px-2">
          <label className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 whitespace-nowrap">Check Out</label>
          <input
            required
            type="date"
            min={getMinCheckOut()}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full max-w-[150px] bg-transparent border-b border-white/30 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white py-2 text-center [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-white/30"></div>

        {/* Rooms & Guests */}
        <div className="flex flex-col items-center w-full md:flex-1 px-2 relative">
          <label className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 whitespace-nowrap">Rooms & Guests</label>
          <div className="relative w-full max-w-[160px]">
            <select
              value={`${rooms},${guests}`}
              onChange={(e) => {
                const [r, g] = e.target.value.split(',');
                setRooms(r);
                setGuests(g);
              }}
              className="w-full bg-transparent border-b border-white/30 text-white text-sm focus:outline-none focus:border-white py-2 appearance-none cursor-pointer text-center pr-6"
            >
              <option value="1,1" className="text-gray-900">1 Room, 1 Guest</option>
              <option value="1,2" className="text-gray-900">1 Room, 2 Guests</option>
              <option value="1,3" className="text-gray-900">1 Room, 3 Guests</option>
              <option value="2,4" className="text-gray-900">2 Rooms, 4 Guests</option>
              <option value="2,6" className="text-gray-900">2 Rooms, 6 Guests</option>
            </select>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-white pb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        
        {/* Book Now */}
        <div className="w-full md:w-auto mt-4 md:mt-0 px-2 flex-shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#0a3824] hover:bg-[#07291a] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap border border-white/10"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}
