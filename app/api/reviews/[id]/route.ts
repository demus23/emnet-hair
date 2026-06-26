import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { approved } = await req.json();

  await connectDB();

  const review = await Review.findByIdAndUpdate(
    id,
    { approved },
    { new: true }
  );

  return NextResponse.json({ review });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();

  await Review.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}