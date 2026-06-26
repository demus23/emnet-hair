import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find();
    const products = await Product.find();
    const pendingReviews = await Review.countDocuments({ approved: false });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    const customers = new Set(
      orders.map((order) => order.customerEmail).filter(Boolean)
    );

    const lowStockProducts = products.filter(
      (product) => product.stock > 0 && product.stock <= 5
    );

    const outOfStockProducts = products.filter(
      (product) => product.stock <= 0
    );

    return NextResponse.json({
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: customers.size,
      totalProducts: products.length,
      pendingReviews,
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    return NextResponse.json(
      { error: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}