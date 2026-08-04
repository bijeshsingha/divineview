"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ROOMS } from "@/data/rooms";
import { getWhatsAppLink } from "@/lib/whatsapp";

const RAZORPAY_LINK = "#";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const initialRoom = searchParams.get("room") || ROOMS[0].id;
  const initialCheckIn = searchParams.get("checkIn") || "";
  const initialCheckOut = searchParams.get("checkOut") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomId: initialRoom,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    numRooms: 1,
    adults: 1,
    children: 0,
  });

  const [couponCode, setCouponCode] = useState("");

  const [bookingState, setBookingState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    available?: boolean;
    basePrice?: number;
    discountAmount?: number;
    totalPrice?: number;
    appliedCoupon?: string | null;
    message?: string;
    nights?: number;
  }>({ status: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset booking state if critical details change
    if (["roomId", "checkIn", "checkOut", "numRooms"].includes(name)) {
      setBookingState({ status: "idle" });
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value.toUpperCase());
    setBookingState({ status: "idle" });
  };

  const getTodayString = () => new Date().toISOString().split("T")[0];

  const getMinCheckOut = () => {
    if (formData.checkIn) {
      const nextDay = new Date(formData.checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split("T")[0];
    }
    return getTodayString();
  };

  const checkAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    
    setBookingState({ status: "loading" });

    try {
      const res = await fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{
            roomId: formData.roomId,
            numRooms: Number(formData.numRooms),
            adults: Number(formData.adults),
            children: Number(formData.children)
          }],
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          couponCode: couponCode
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        setBookingState({ status: "error", message: data.error || "Failed to check availability." });
        return;
      }

      setBookingState({
        status: "success",
        available: data.available,
        basePrice: data.basePrice,
        discountAmount: data.discountAmount,
        totalPrice: data.totalPrice,
        appliedCoupon: data.appliedCoupon,
        message: data.message,
        nights: data.nights
      });
    } catch (error) {
      setBookingState({ status: "error", message: "Network error. Please try again." });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bookingState.status !== "success" || !bookingState.available) {
      alert("Please check availability before proceeding.");
      return;
    }

    const room = ROOMS.find(r => r.id === formData.roomId);
    
    let msg = `*New Booking Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Room:* ${room?.name}%0A*Number of Rooms:* ${formData.numRooms}%0A*Check-in:* ${formData.checkIn}%0A*Check-out:* ${formData.checkOut}%0A*Nights:* ${bookingState.nights}%0A*Guests:* ${formData.adults} Adults, ${formData.children} Children`;
    
    if (bookingState.appliedCoupon) {
      msg += `%0A*Coupon Applied:* ${bookingState.appliedCoupon}`;
    }
    
    msg += `%0A*Total Amount:* Rs. ${bookingState.totalPrice}/-`;
    
    const waLink = getWhatsAppLink(decodeURIComponent(msg));

    if (RAZORPAY_LINK !== "#") window.open(RAZORPAY_LINK, "_blank");
    window.location.href = waLink;
  };

  const ROOM_POLICIES: Record<string, { maxAdults: number }> = {
    "double-standard": { maxAdults: 2 },
    "double-deluxe": { maxAdults: 3 },
    "double-executive": { maxAdults: 3 },
    "family-executive": { maxAdults: 4 },
  };
  
  const currentMaxAdults = (ROOM_POLICIES[formData.roomId]?.maxAdults || 2) * Number(formData.numRooms);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">Guest Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="+91 98765 43210" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" placeholder="john@example.com" />
          </div>
        </div>

        {/* Stay Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">Stay Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Room *</label>
            <select required name="roomId" value={formData.roomId} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white">
              {ROOMS.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name} - Rs. {room.price}/night
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in *</label>
              <input required type="date" name="checkIn" min={getTodayString()} value={formData.checkIn} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out *</label>
              <input required type="date" name="checkOut" min={getMinCheckOut()} value={formData.checkOut} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rooms *</label>
              <input required type="number" min="1" name="numRooms" value={formData.numRooms} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults (Max {currentMaxAdults})</label>
              <input required type="number" min="1" max={currentMaxAdults} name="adults" value={formData.adults} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <input type="number" min="0" max={Number(formData.numRooms) * 2} name="children" value={formData.children} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
          </div>
          
          {Number(formData.adults) > currentMaxAdults && (
            <p className="text-red-600 text-xs font-semibold">Maximum {currentMaxAdults} adults allowed for {formData.numRooms} room(s).</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
            <div className="flex gap-2">
              <input type="text" value={couponCode} onChange={handleCouponChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary uppercase placeholder:normal-case" placeholder="Got a promo code?" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary & Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        
        {/* Availability Check Results */}
        {bookingState.status === "error" && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 font-medium">
            {bookingState.message}
          </div>
        )}

        {bookingState.status === "success" && !bookingState.available && (
          <div className="bg-orange-50 text-orange-700 p-4 rounded-xl mb-6 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {bookingState.message}
          </div>
        )}

        {bookingState.status === "success" && bookingState.available && (
          <div className="bg-green-50/50 border border-green-100 p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Room Available!
                </h3>
                <p className="text-gray-600 mt-1">
                  {bookingState.nights} Night(s) in {ROOMS.find(r => r.id === formData.roomId)?.name}
                </p>
                {bookingState.appliedCoupon && (
                  <p className="text-sm font-semibold text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                    Coupon Applied: {bookingState.appliedCoupon}
                  </p>
                )}
              </div>
              <div className="text-center md:text-right">
                {bookingState.discountAmount && bookingState.discountAmount > 0 ? (
                  <>
                    <p className="text-sm text-gray-500 line-through">Rs. {bookingState.basePrice}</p>
                    <p className="text-3xl font-bold text-primary">Rs. {bookingState.totalPrice}</p>
                    <p className="text-xs text-green-600 font-medium">You saved Rs. {bookingState.discountAmount}!</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Total Amount</p>
                    <p className="text-3xl font-bold text-primary">Rs. {bookingState.totalPrice}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        {bookingState.status === "success" && bookingState.available ? (
          <button 
            onClick={handleSubmit}
            disabled={Number(formData.adults) > currentMaxAdults}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-50 disabled:transform-none"
          >
            Confirm & Pay via Razorpay
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        ) : (
          <button 
            type="button"
            onClick={checkAvailability}
            disabled={bookingState.status === "loading" || !formData.checkIn || !formData.checkOut || Number(formData.adults) > currentMaxAdults}
            className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-md transition-colors flex justify-center items-center"
          >
            {bookingState.status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Checking Inventory & Pricing...
              </>
            ) : (
              "Check Availability & Calculate Price"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
