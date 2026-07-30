"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ROOMS } from "@/data/rooms";
import { AMBARISH_ROOMS } from "@/data/ambarishRooms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

// Dummy keys for UI rendering. Replace in production!
const RAZORPAY_KEY = "rzp_test_dummykey12345"; 

type CartItem = {
  roomId: string;
  name: string;
  numRooms: number;
  adults: number;
  children: number;
  price: number;
};

const Counter = ({ label, value, onChange, min = 0 }: any) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">{label}</span>
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors">−</button>
      <span className="w-6 text-center text-sm font-bold text-gray-900">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-medium transition-colors">+</button>
    </div>
  </div>
);

export default function BookingFlow({ hotel = "divine-view" }: { hotel?: "divine-view" | "ambarish" }) {
  const [isMounted, setIsMounted] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeRooms = hotel === "ambarish" ? AMBARISH_ROOMS : ROOMS;
  const initialRoomId = searchParams.get("room");

  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOut, setCheckOut] = useState<Date | null>(tomorrow);
  
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // States for room addition inputs
  const [roomInputs, setRoomInputs] = useState<Record<string, { rooms: number; adults: number; children: number }>>({});

  // Hydrate state from sessionStorage
  useEffect(() => {
    setIsMounted(true);
    
    const savedCart = sessionStorage.getItem(`cart_${hotel}`);
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
    const savedDates = sessionStorage.getItem(`dates_${hotel}`);
    if (savedDates) {
      try {
        const { in: cIn, out: cOut } = JSON.parse(savedDates);
        if (cIn) setCheckIn(new Date(cIn));
        if (cOut) setCheckOut(new Date(cOut));
      } catch (e) {}
    }
  }, [hotel]);

  // Persist cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`cart_${hotel}`, JSON.stringify(cart));
  }, [cart, hotel]);

  // Persist dates to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`dates_${hotel}`, JSON.stringify({
      in: checkIn?.toISOString(),
      out: checkOut?.toISOString()
    }));
  }, [checkIn, checkOut, hotel]);

  // Auto-add room from URL if it's not in the cart yet (and cart is empty)
  useEffect(() => {
    if (initialRoomId && cart.length === 0) {
      const roomToAdd = activeRooms.find(r => r.id === initialRoomId);
      if (roomToAdd) {
        setCart([{
          roomId: roomToAdd.id,
          name: roomToAdd.name,
          numRooms: 1,
          adults: 2,
          children: 0,
          price: parseInt(roomToAdd.price)
        }]);
      }
    }
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoomId]);

  const handleRoomInput = (roomId: string, field: string, val: number) => {
    if (val < 0) return;
    if (field === "rooms" && val < 1) return;
    setRoomInputs(prev => ({
      ...prev,
      [roomId]: {
        ...((prev[roomId]) || { rooms: 1, adults: 2, children: 0 }),
        [field]: val
      }
    }));
  };

  const addToCart = (room: any) => {
    const inputs = roomInputs[room.id] || { rooms: 1, adults: 2, children: 0 };
    const newItem: CartItem = {
      roomId: room.id,
      name: room.name,
      numRooms: inputs.rooms,
      adults: inputs.adults,
      children: inputs.children,
      price: parseInt(room.price)
    };
    setCart([...cart, newItem]);
    // Reset inputs for this room
    setRoomInputs(prev => {
      const next = { ...prev };
      delete next[room.id];
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Calculate nights and totals
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (nights === 0) return 0;
    const perNight = cart.reduce((acc, item) => acc + (item.price * item.numRooms), 0);
    return perNight * nights;
  }, [cart, nights]);

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

  const handlePayment = async () => {
    if (!guestName || !guestPhone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    if (!checkIn || !checkOut || nights === 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice })
      });
      const order = await orderRes.json();

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load payment gateway. Please check your connection.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: hotel === "ambarish" ? "Hotel Ambarish" : "Hotel Divine View",
        description: `Booking for ${cart.length} room(s)`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const pmsRes = await fetch("/api/pms/create-reservation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                cart,
                checkIn, checkOut,
                guestDetails: { name: guestName, email: guestEmail, phone: guestPhone }
              })
            });
            const pmsData = await pmsRes.json();
            
            if (pmsData.success) {
              // Clear cart after success
              sessionStorage.removeItem(`cart_${hotel}`);
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
          color: hotel === "ambarish" ? "#111827" : "#064e3b" 
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
      
      setTimeout(() => setIsProcessing(false), 3000);
      
    } catch (error) {
      alert("Something went wrong initiating the payment.");
      setIsProcessing(false);
    }
  };

  const hotelColor = hotel === "ambarish" ? "bg-gray-900" : "bg-primary";
  const hoverColor = hotel === "ambarish" ? "hover:bg-black" : "hover:bg-primary-dark";
  const textHotelColor = hotel === "ambarish" ? "text-gray-900" : "text-primary";

  if (!isMounted) {
    return <div className="text-center py-20 text-gray-500 font-medium">Loading booking engine...</div>;
  }

  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/${hotel}`} className={`${textHotelColor} font-bold hover:underline inline-flex items-center transition-colors`}>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to {hotel === "ambarish" ? "Hotel Ambarish" : "Hotel Divine View"}
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        
        {/* LEFT COLUMN: 70% */}
        <div className="w-full lg:w-[70%] space-y-8">
          
          {/* STEP 1: DATES */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">1. Select Dates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-bold text-gray-700 mb-2">Check In</label>
                <DatePicker 
                  id="checkIn"
                  selected={checkIn} 
                  onChange={(date: Date | null) => {
                    setCheckIn(date);
                    if (date && checkOut && date >= checkOut) {
                      setCheckOut(new Date(date.getTime() + 86400000));
                    }
                  }} 
                  selectsStart 
                  startDate={checkIn} 
                  endDate={checkOut} 
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-bold text-gray-700 mb-2">Check Out</label>
                <DatePicker 
                  id="checkOut"
                  selected={checkOut} 
                  onChange={(date: Date | null) => setCheckOut(date)} 
                  selectsEnd 
                  startDate={checkIn} 
                  endDate={checkOut} 
                  minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date(new Date().getTime() + 86400000)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </div>
          </Card>

          {/* STEP 2: AVAILABLE ROOMS */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
              2. Choose Your Rooms
              {nights > 0 && <span className="ml-4 text-sm font-normal text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{nights} Night(s)</span>}
            </h2>
            
            {(!checkIn || !checkOut || nights === 0) ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">Please select valid dates above to see available rooms.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {activeRooms.map((room, idx) => {
                  const inputs = roomInputs[room.id] || { rooms: 1, adults: 2, children: 0 };
                  return (
                    <div key={room.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow bg-gray-50/50">
                      <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={room.heroImage} 
                          alt={room.name} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={idx < 2}
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                            <div className="text-right">
                              <span className={`text-xl font-bold ${textHotelColor}`}>₹{room.price}</span>
                              <span className="text-xs text-gray-500 block">/ night</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{room.shortDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.slice(0,3).map((am, i) => (
                              <span key={i} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">{am}</span>
                            ))}
                          </div>
                        </div>

                        {/* Add to Cart Config */}
                        <div className="flex flex-wrap items-end justify-between gap-4 mt-auto pt-4 border-t border-gray-200">
                          <div className="flex gap-2 sm:gap-4">
                            <Counter label="Rooms" min={1} value={inputs.rooms} onChange={(val: number) => handleRoomInput(room.id, "rooms", val)} />
                            <Counter label="Adults" min={1} value={inputs.adults} onChange={(val: number) => handleRoomInput(room.id, "adults", val)} />
                            <Counter label="Child" min={0} value={inputs.children} onChange={(val: number) => handleRoomInput(room.id, "children", val)} />
                          </div>
                          
                          <Button 
                            onClick={() => addToCart(room)}
                            className={`${hotel === "ambarish" ? "bg-gray-900 hover:bg-black" : "bg-primary hover:bg-primary-dark"} text-white whitespace-nowrap mb-0.5`}
                            size="sm"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* STEP 3: GUEST DETAILS */}
          {cart.length > 0 && (
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">3. Guest Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input required label="Full Name *" type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="John Doe" />
                <Input required label="Phone Number *" type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+91 98765 43210" />
                <div className="md:col-span-2">
                  <Input label="Email Address" type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="john@example.com (For your receipt)" />
                </div>
              </div>
            </Card>
          )}

          <div className="h-24 lg:hidden"></div>
        </div>

        {/* RIGHT COLUMN: 30% (Sticky Cart Widget) */}
        <div className="hidden lg:block w-[30%] relative">
          <Card className="sticky top-24 p-6 flex flex-col gap-6 shadow-xl border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Your Cart</h3>
            
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-xl">
                  <p>Cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="bg-stone-50 border border-stone-200 p-3 rounded-xl relative group">
                      <button aria-label="Remove item" onClick={() => removeFromCart(idx)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                      <span className="font-bold text-gray-900 block text-sm pr-6">{item.name}</span>
                      <span className="text-gray-500 text-xs block mb-1">{item.numRooms} Room(s) · {item.adults} Ad · {item.children} Ch</span>
                      <span className={`font-bold ${textHotelColor} text-sm`}>₹{item.price * item.numRooms}/night</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              {cart.length > 0 && nights > 0 && (
                <div className="bg-stone-50 rounded-xl p-4 space-y-2 border border-stone-200 shadow-inner mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rooms ({cart.length}) × {nights} Nights</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-2">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className={`text-2xl font-bold ${textHotelColor}`}>₹{totalPrice}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing || cart.length === 0 || nights === 0} 
                className={`mt-2 ${hotel === "ambarish" ? "bg-gray-900 hover:bg-black" : ""}`}
                fullWidth
                size="lg"
              >
                {isProcessing ? "Processing..." : "Proceed to Pay"}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-2 flex items-center justify-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Secure 256-bit encrypted checkout
              </p>
              <p className="text-[10px] text-center text-gray-400 mt-3 leading-relaxed">
                By clicking &quot;Proceed to Pay&quot;, you agree to our <br/>
                <Link href="/policies" target="_blank" className="underline hover:text-gray-700 font-medium">Cancellation Policy</Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* MOBILE PERSISTENT BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-3 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Total ({nights} Nights)</p>
            <p className={`text-xl font-bold ${textHotelColor}`}>₹{totalPrice}</p>
          </div>
          <button 
            onClick={cart.length === 0 ? () => window.scrollTo({top: 0, behavior: 'smooth'}) : handlePayment} 
            disabled={isProcessing} 
            className={`${cart.length === 0 ? 'bg-gray-900' : hotelColor} text-white font-bold py-3 px-8 rounded-full shadow-md`}
          >
            {isProcessing ? "Wait..." : cart.length === 0 ? "Add Rooms" : "Pay Now"}
          </button>
        </div>
        {cart.length > 0 && (
          <p className="text-[10px] text-center text-gray-400 mt-2">
            By proceeding, you agree to our <Link href="/policies" target="_blank" className="underline">Cancellation Policy</Link>
          </p>
        )}
      </div>

    </div>
  );
}
