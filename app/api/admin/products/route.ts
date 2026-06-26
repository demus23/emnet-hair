import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

function splitText(value: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseVariants(value: string) {
  if (!value) return [];

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [length, gram, price, stock] = line
        .split("|")
        .map((item) => item.trim());

      return {
        length,
        gram,
        price: Number(price || 0),
        stock: Number(stock || 0),
      };
    });
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.create({
      name: body.name,
      slug: body.slug,
      price: Number(body.price),
      compareAtPrice: Number(body.compareAtPrice || 0),

      description: body.description,
      category: body.category,
      tag: body.tag,

      texture: body.texture,
      textures: splitText(body.textures),

      length: body.length,
      lengths: splitText(body.lengths),

      gram: body.gram,
      grams: splitText(body.grams),

      variants: parseVariants(body.variants),

      colors: splitText(body.colors),
      care: splitText(body.care),

      stock: Number(body.stock || 0),

      images: body.images || [],
      video: body.video || "",

      rating: Number(body.rating || 5),
      reviews: Number(body.reviews || 0),

      isFeatured: body.isFeatured || false,
      isActive: true,
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Product creation failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.findByIdAndUpdate(
      body._id,
      {
        name: body.name,
        slug: body.slug,
        price: Number(body.price),
        compareAtPrice: Number(body.compareAtPrice || 0),

        description: body.description,
        category: body.category,
        tag: body.tag,

        texture: body.texture,
        textures: splitText(body.textures),

        length: body.length,
        lengths: splitText(body.lengths),

        gram: body.gram,
        grams: splitText(body.grams),

        variants: parseVariants(body.variants),

        colors: splitText(body.colors),
        care: splitText(body.care),

        stock: Number(body.stock || 0),

        images: body.images || [],
        video: body.video || "",

        rating: Number(body.rating || 5),
        reviews: Number(body.reviews || 0),
      },
      { new: true }
    );

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Product update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Product delete failed" },
      { status: 500 }
    );
  }
}