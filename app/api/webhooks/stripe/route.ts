import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  console.log("🔥 STRIPE WEBHOOK RECEIVED");

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.log("❌ Missing Stripe signature");

    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("✅ Event Type:", event.type);
  } catch (error) {
    console.error("❌ Webhook signature error:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("💰 Saving order:", session.id);

      await connectDB();

      const cartItems = session.metadata?.cart
        ? JSON.parse(session.metadata.cart)
        : [];

      console.log("🛒 Cart items:", cartItems);

      const savedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          customerEmail: session.customer_email || "",
          customerName: session.customer_details?.name || "",
          items: cartItems,
          totalAmount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency || "aed",
          status: "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : "",
        },
        { upsert: true, new: true }
      );

      console.log("✅ Order saved:", savedOrder._id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Order save error:", error);

    return NextResponse.json(
      { error: "Order save failed" },
      { status: 500 }
    );
  }
}