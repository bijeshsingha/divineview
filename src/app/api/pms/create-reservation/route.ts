import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // data contains: paymentId, orderId, cart (array of rooms), checkIn, checkOut, guestDetails
    
    // In production, this pushes data to the PMS (e.g. Hotelogix, Cloudbeds, etc)
    // For now, we simulate success and return a confirmation ID
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate 1% failure rate for realistic error handling
    if (Math.random() < 0.01) {
       throw new Error("Simulated PMS Sync Timeout");
    }

    const reservationId = `HDV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      reservationId,
      message: `Reservation for ${data.cart?.length || 0} rooms successfully synced with PMS.`
    });

  } catch (error) {
    console.error("PMS Sync Error:", error);
    // In a real app, this is where we'd alert admins that payment succeeded but PMS failed!
    return NextResponse.json({ error: "Failed to sync reservation to PMS" }, { status: 500 });
  }
}
