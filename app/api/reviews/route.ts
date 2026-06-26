import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  const admin = searchParams.get("admin");

  await connectDB();

  const query: any = {};

  if (productId) query.productId = productId;
  if (!admin) query.approved = true;

  const reviews = await Review.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const review = await Review.create({
      productId: body.productId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      rating: body.rating,
      comment: body.comment,
      approved: false,
    });

    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}