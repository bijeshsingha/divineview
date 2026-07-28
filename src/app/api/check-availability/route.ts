import { NextResponse } from 'next/server';
import { ROOMS } from '@/data/rooms';
import { AMBARISH_ROOMS } from '@/data/ambarishRooms';

type CartItem = {
  roomId: string;
  name: string;
  numRooms: number;
  adults: number;
  children: number;
  price: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart, checkIn, checkOut, couponCode } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0 || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Missing required parameters or empty cart" }, { status: 400 });
    }

    const allRooms = [...ROOMS, ...AMBARISH_ROOMS];
    
    // Calculate nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return NextResponse.json({ error: "Invalid dates selected" }, { status: 400 });
    }

    let basePrice = 0;

    for (const item of cart as CartItem[]) {
      const room = allRooms.find(r => r.id === item.roomId);
      if (!room) {
        return NextResponse.json({ error: `Invalid room selected: ${item.roomId}` }, { status: 404 });
      }
      basePrice += parseInt(room.price) * item.numRooms * nights;
    }

    let discountAmount = 0;
    let appliedCoupon = null;

    // Simulated Coupon Logic
    if (couponCode) {
      const code = couponCode.toUpperCase().trim();
      if (code === "SM30OF") {
        discountAmount = Math.round(basePrice * 0.30);
        appliedCoupon = "SM30OF (30% OFF)";
      } else if (code === "FLAT500") {
        discountAmount = 500;
        appliedCoupon = "FLAT500 (₹500 OFF)";
      }
    }

    // Ensure we don't discount more than the base price
    if (discountAmount > basePrice) {
      discountAmount = basePrice;
    }

    const totalPrice = basePrice - discountAmount;

    // Simulate real-time availability check (Randomly fails 5% of the time to feel real)
    const isAvailable = Math.random() > 0.05;

    // Simulate network delay to make it feel like a real PMS connection
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!isAvailable) {
      return NextResponse.json({ 
        available: false,
        message: "Sorry, one or more rooms in your cart are sold out for the selected dates."
      });
    }

    return NextResponse.json({
      available: true,
      nights,
      basePrice,
      discountAmount,
      appliedCoupon,
      totalPrice,
      message: "All rooms are available!"
    });

  } catch (error) {
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
