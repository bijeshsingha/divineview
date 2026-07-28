import { NextResponse } from 'next/server';
import { ROOMS } from '@/data/rooms';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, checkIn, checkOut, numRooms, couponCode } = body;

    if (!roomId || !checkIn || !checkOut || !numRooms) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const room = ROOMS.find(r => r.id === roomId);
    
    if (!room) {
      return NextResponse.json({ error: "Invalid room selected" }, { status: 404 });
    }

    // Calculate nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return NextResponse.json({ error: "Invalid dates selected" }, { status: 400 });
    }

    const basePrice = parseInt(room.price) * numRooms * nights;
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
    // For testing, we'll keep it mostly available.
    const isAvailable = Math.random() > 0.05;

    // Simulate network delay to make it feel like a real PMS connection
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!isAvailable) {
      return NextResponse.json({ 
        available: false,
        message: "Sorry, this room is sold out for the selected dates."
      });
    }

    return NextResponse.json({
      available: true,
      nights,
      basePrice,
      discountAmount,
      appliedCoupon,
      totalPrice,
      message: "Room is available!"
    });

  } catch (error) {
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
