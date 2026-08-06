import { NextResponse } from 'next/server';

// Initialize Razorpay (Commented out until real keys are provided)
// import Razorpay from 'razorpay';
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt, paymentType = "full" } = await request.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const finalAmount = paymentType === "partial" ? Math.round(amount / 2) : amount;

    // SIMULATED RAZORPAY ORDER CREATION
    // In production, you would do:
    // const order = await razorpay.orders.create({ amount: amount * 100, currency, receipt });
    
    // For now, we simulate a network delay and return a dummy order
    await new Promise(resolve => setTimeout(resolve, 600));

    const dummyOrder = {
      id: `order_sim_${Math.random().toString(36).substring(2, 10)}`,
      amount: finalAmount * 100, // Razorpay uses paise
      currency,
      receipt,
      status: "created"
    };

    return NextResponse.json(dummyOrder);

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
