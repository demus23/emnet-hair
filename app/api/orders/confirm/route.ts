import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { sendNewOrderEmails } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    await connectDB();

    const cartItems = session.metadata?.cart
      ? JSON.parse(session.metadata.cart)
      : [];

    const shipping = session.metadata?.shipping
      ? JSON.parse(session.metadata.shipping)
      : {};

    let order = await Order.findOne({ stripeSessionId: session.id });

    if (!order) {
      order = await Order.create({
        userEmail: shipping.email || session.customer_email || "",
        customerEmail: shipping.email || session.customer_email || "",
        customerName:
          shipping.fullName || session.customer_details?.name || "",
        shipping,
        items: cartItems,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || "aed",
        status: "paid",
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : "",
      });

      for (const item of cartItems) {
        if (item.productId) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -(item.quantity || 1) },
          });
        }
      }

      await sendNewOrderEmails(order);
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Confirm order error:", error);

    return NextResponse.json(
      { error: "Failed to confirm order" },
      { status: 500 }
    );
  }
}