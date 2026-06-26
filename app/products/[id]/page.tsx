import ProductDetailsClient from "./ProductDetailsClient";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

async function getProduct(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    return JSON.parse(JSON.stringify(product));
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductDetailsClient product={product} />;
}