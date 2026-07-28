"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ROOMS } from "@/data/rooms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Dummy keys for UI rendering. Replace in production!
const RAZORPAY_KEY = "rzp_test_dummykey12345"; 

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRoom = searchParams.get("room") || ROOMS[0].id;

  const [selectedRoomId, setSelectedRoomId] = useState(initialRoom);
  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0];

  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  
  // Set default checkout to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState<Date | null>(tomorrow);
  
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

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

  const [isProcessing, setIsProcessing] = useState(false);

  // Reset availability if critical search parameters change
  useEffect(() => {
    setBookingState({ status: "idle" });
  }, [selectedRoomId, checkIn, checkOut, numRooms, adults, children]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;
    
    setBookingState({ status: "loading" });

    try {
      const res = await fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoomId,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          numRooms,
          couponCode
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setBookingState({
        status: "success",
        ...data
      });
    } catch (error: any) {
      setBookingState({ status: "error", message: error.message || "Failed to check availability." });
    }
  };

  const handlePayment = async () => {
    if (!guestName || !guestPhone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create Order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bookingState.totalPrice })
      });
      const order = await orderRes.json();

      // 2. Load Razorpay
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load payment gateway. Please check your connection.");
        setIsProcessing(false);
        return;
      }

      // 3. Open Modal
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Hotel Divine View",
        description: `Booking for ${selectedRoom.name}`,
        order_id: order.id,
        handler: async function (response: any) {
          // 4. On Success, Sync with PMS
          try {
            const pmsRes = await fetch("/api/pms/create-reservation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                roomId: selectedRoomId,
                checkIn, checkOut,
                guestDetails: { name: guestName, email: guestEmail, phone: guestPhone }
              })
            });
            const pmsData = await pmsRes.json();
            
            if (pmsData.success) {
              router.push(`/booking-confirmation?id=${pmsData.reservationId}`);
            } else {
              alert("Payment succeeded but PMS sync failed. Our team will contact you.");
            }
          } catch (e) {
            alert("Error confirming reservation with hotel system. Please contact support.");
          }
        },
        prefill: {
          name: guestName,
          email: guestEmail,
          contact: guestPhone
        },
        theme: {
          color: "#166534" // Primary dark green
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
      
      // Safety timeout to reset processing state if user closes modal without interacting
      setTimeout(() => setIsProcessing(false), 3000);
      
    } catch (error) {
      alert("Something went wrong initiating the payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      
      {/* LEFT COLUMN: 70% (Room Info & Guest Details) */}
      <div className="w-full lg:w-[70%] space-y-8">
        
        {/* Room Gallery & Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-64 sm:h-80 md:h-96 relative">
            <Image 
              src={selectedRoom.heroImage} 
              alt={selectedRoom.name} 
              fill 
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-800">High Demand</span>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                  {selectedRoom.name}
                </h1>
                <p className="text-gray-500 font-medium">Max Occupancy: {selectedRoom.maxOccupancy}</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
              {selectedRoom.longDescription}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Room Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
              {selectedRoom.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">📍</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Prime Location</span>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">✨</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Spotless Clean</span>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">🛡️</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Secure Booking</span>
          </div>
        </div>

        {/* Guest Details Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Guest Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input required type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" placeholder="+91 98765 43210" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" placeholder="john@example.com (For your receipt)" />
            </div>
          </div>
        </div>

        {/* Extra space for mobile padding at bottom so button doesn't hide content */}
        <div className="h-24 lg:hidden"></div>

      </div>

      {/* RIGHT COLUMN: 30% (Sticky Booking Widget) */}
      <div className="hidden lg:block w-[30%] relative">
        <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Your Stay</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Select Room</label>
              <select value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-stone-50 font-medium text-gray-900 cursor-pointer">
                {ROOMS.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check In</label>
                <DatePicker 
                  selected={checkIn} 
                  onChange={(date: Date | null) => setCheckIn(date)} 
                  selectsStart 
                  startDate={checkIn} 
                  endDate={checkOut} 
                  minDate={new Date()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check Out</label>
                <DatePicker 
                  selected={checkOut} 
                  onChange={(date: Date | null) => setCheckOut(date)} 
                  selectsEnd 
                  startDate={checkIn} 
                  endDate={checkOut} 
                  minDate={checkIn || new Date()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-4 my-2">
              <div className="text-center">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rooms</label>
                <input type="number" min="1" value={numRooms} onChange={e => setNumRooms(Number(e.target.value))} className="w-full text-center p-1 border border-gray-300 rounded font-medium" />
              </div>
              <div className="text-center">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Adults</label>
                <input type="number" min="1" value={adults} onChange={e => setAdults(Number(e.target.value))} className="w-full text-center p-1 border border-gray-300 rounded font-medium" />
              </div>
              <div className="text-center">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Child</label>
                <input type="number" min="0" value={children} onChange={e => setChildren(Number(e.target.value))} className="w-full text-center p-1 border border-gray-300 rounded font-medium" />
              </div>
            </div>

            {/* Price Calculation Area */}
            {bookingState.status === "success" && bookingState.available ? (
              <div className="bg-stone-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{selectedRoom.price} × {bookingState.nights} nights × {numRooms} rooms</span>
                  <span>₹{bookingState.basePrice}</span>
                </div>
                
                {bookingState.discountAmount && bookingState.discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount ({bookingState.appliedCoupon})</span>
                    <span>-₹{bookingState.discountAmount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-2">
                  <span>Taxes & Fees</span>
                  <span>Included</span>
                </div>
                
                <div className="flex justify-between items-end pt-2">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{bookingState.totalPrice}</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Promo Code</label>
                <div className="flex gap-2">
                  <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} className="w-full px-3 py-2 border border-gray-300 rounded-lg uppercase text-sm" placeholder="e.g. SM30OF" />
                </div>
              </div>
            )}

            {/* Error States */}
            {bookingState.status === "error" && <p className="text-sm text-red-600 font-medium">{bookingState.message}</p>}
            {bookingState.status === "success" && !bookingState.available && <p className="text-sm text-orange-600 font-medium">{bookingState.message}</p>}

            {/* CTA Button */}
            {bookingState.status === "success" && bookingState.available ? (
              <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center">
                {isProcessing ? "Processing..." : "Proceed to Pay"}
              </button>
            ) : (
              <button onClick={handleCheckAvailability} disabled={bookingState.status === "loading"} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-md transition-all">
                {bookingState.status === "loading" ? "Checking..." : "Check Availability"}
              </button>
            )}
            
            <p className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Secure 256-bit encrypted checkout
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE PERSISTENT BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50">
        {bookingState.status === "success" && bookingState.available ? (
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
              <p className="text-xl font-bold text-primary">₹{bookingState.totalPrice}</p>
            </div>
            <button onClick={handlePayment} disabled={isProcessing} className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-md">
              {isProcessing ? "Wait..." : "Pay Now"}
            </button>
          </div>
        ) : (
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full bg-gray-900 text-white font-bold py-3 rounded-full shadow-md">
            Check Availability
          </button>
        )}
      </div>

    </div>
  );
}
