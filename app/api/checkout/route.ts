import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { items, shipping } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (!shipping?.fullName || !shipping?.email || !shipping?.phone || !shipping?.address) {
      return NextResponse.json(
        { error: "Missing shipping details" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: shipping.email,

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "aed",
          product_data: {
            name: item.name,
            metadata: {
              productId: item.id || item._id || "",
            },
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity || 1,
      })),

      metadata: {
        shipping: JSON.stringify(shipping),
        cart: JSON.stringify(
          items.map((item: any) => ({
            productId: item.id || item._id,
            name: item.name,
            image: item.image || "",
            price: item.price,
            quantity: item.quantity || 1,
          }))
        ),
      },

      success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}