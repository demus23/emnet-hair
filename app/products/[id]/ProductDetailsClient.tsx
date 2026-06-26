"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart } from "@/lib/cart";
import { getWishlist, saveWishlist } from "@/lib/wishlist";
import { useSession } from "next-auth/react";

export default function ProductDetailsClient({ product }: { product: any }) {
  const images = product?.images?.length ? product.images : ["/hero-hair.jpg"];
  const { data: session } = useSession();

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedTexture, setSelectedTexture] = useState("");
  const [selectedColor, setSelectedColor] = useState("Natural Black");

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`/api/reviews?productId=${product?._id}`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error(error);
      }
    }

    if (product?._id) loadReviews();
  }, [product?._id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F5EFE7] p-10 text-[#2C2018]">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </main>
    );
  }

  const lengths =
    product.lengths?.length > 0
      ? product.lengths
      : product.length
      ? product.length.split(",").map((x: string) => x.trim())
      : ["10 inch", "12 inch", "14 inch", "16 inch"];

  const textures =
    product.textures?.length > 0
      ? product.textures
      : product.texture
      ? [product.texture]
      : ["Premium"];

  const colors =
    product.colors?.length > 0
      ? product.colors
      : ["Natural Black", "Custom Color"];

  const care =
    product.care?.length > 0
      ? product.care
      : [
          "Wash with conditioner only.",
          "Brush with fingers or wide comb.",
          "Moisturize curls regularly.",
          "Can be dyed and styled carefully.",
          "Lasts up to 18 months with proper care.",
        ];

  function handleAddToCart() {
    if (product.stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    const cart = getCart();

    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: images[0],
      category: product.category,
      quantity,
      selectedLength,
      selectedTexture,
      selectedColor,
    };

    saveCart([...cart, item] as any);
    alert("Added to cart");
  }

  function handleWishlist() {
    const wishlist = getWishlist();

    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: images[0],
      category: product.category,
    };

    saveWishlist([...wishlist, item] as any);
    alert("Added to wishlist");
  }

  async function submitReview() {
    if (!session?.user?.email) {
      alert("Please login first");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          customerName: session.user.name || "Customer",
          customerEmail: session.user.email,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (data.review) {
        alert("Review submitted and awaiting approval.");
        setComment("");
        setRating(5);
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5EFE7] px-6 py-10 text-[#2C2018] md:px-12">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-[#E8D9C6] pb-8">
          <Link href="/" className="text-4xl font-bold tracking-[0.35em]">
            EMNET
            <span className="block text-center text-sm tracking-[0.35em] text-[#C9A978]">
              HAIR
            </span>
          </Link>

          <nav className="flex gap-8 font-bold">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>

        <div className="mb-10 text-[#7A6550]">
          Home / Shop / {product.category} /{" "}
          <span className="text-[#2C2018]">{product.name}</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="relative overflow-hidden rounded-[40px] bg-[#E8D9C6] shadow-xl">
              {product.tag && (
                <span className="absolute left-8 top-8 rounded-full bg-[#C9A978] px-6 py-3 font-bold text-white">
                  {product.tag}
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                className="h-[650px] w-full object-cover"
              />
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-3xl border p-2 ${
                    selectedImage === img
                      ? "border-[#C9A978]"
                      : "border-[#E8D9C6]"
                  }`}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="h-28 w-full rounded-2xl object-cover"
                  />
                </button>
              ))}
            </div>

            {product.video && (
              <video
                controls
                className="mt-8 w-full rounded-[35px] bg-black"
                src={product.video}
              />
            )}
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C9A978]">
              {product.category}
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              {product.name}
            </h1>

            <p className="mt-6 text-3xl font-bold text-[#8b3a4a]">
              AED {product.price}
            </p>

            <div className="mt-4">
              {product.stock <= 0 ? (
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  Out of Stock
                </span>
              ) : product.stock <= 5 ? (
                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                  Only {product.stock} left
                </span>
              ) : (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  In Stock
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 text-lg leading-8 text-[#7A6550]">
                {product.description}
              </p>
            )}

            <div className="mt-8 grid gap-4 rounded-[30px] bg-white p-6 shadow md:grid-cols-3">
              <div>
                <h3 className="font-bold">Premium Quality</h3>
                <p className="text-[#7A6550]">100% Virgin Human Hair</p>
              </div>
              <div>
                <h3 className="font-bold">Secure Payment</h3>
                <p className="text-[#7A6550]">Safe checkout</p>
              </div>
              <div>
                <h3 className="font-bold">Fast Delivery</h3>
                <p className="text-[#7A6550]">UAE & worldwide</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-bold uppercase tracking-[0.2em]">
                Length
              </h3>
              <div className="flex flex-wrap gap-3">
                {lengths.map((length: string) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`rounded-full border px-7 py-4 font-bold ${
                      selectedLength === length
                        ? "border-[#C9A978] bg-[#EDE3D6]"
                        : "border-[#E8D9C6] bg-white"
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-bold uppercase tracking-[0.2em]">
                Texture
              </h3>
              <div className="flex flex-wrap gap-3">
                {textures.map((texture: string) => (
                  <button
                    key={texture}
                    onClick={() => setSelectedTexture(texture)}
                    className={`rounded-full border px-7 py-4 font-bold ${
                      selectedTexture === texture
                        ? "border-[#C9A978] bg-[#EDE3D6]"
                        : "border-[#E8D9C6] bg-white"
                    }`}
                  >
                    {texture}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-bold uppercase tracking-[0.2em]">
                Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-7 py-4 font-bold ${
                      selectedColor === color
                        ? "border-[#C9A978] bg-[#EDE3D6]"
                        : "border-[#E8D9C6] bg-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 font-bold uppercase tracking-[0.2em]">
                Quantity
              </h3>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-14 w-14 rounded-full border bg-white text-2xl font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock > 0 && quantity >= product.stock}
                  className="h-14 w-14 rounded-full border bg-white text-2xl font-bold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="rounded-full bg-[#C9A978] px-10 py-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                className="rounded-full border border-[#E8D9C6] bg-white px-10 py-5 font-bold"
              >
                Add to Wishlist
              </button>
            </div>

            <div className="mt-10 rounded-[35px] bg-white p-8 shadow">
              <h3 className="text-2xl font-bold">Detail & Care</h3>
              <ul className="mt-6 space-y-4 text-[#7A6550]">
                {care.map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-[35px] bg-white p-8 shadow">
              <h3 className="text-2xl font-bold">Customer Reviews</h3>

              <div className="mt-6 space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-[#7A6550]">No reviews yet.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-2xl border border-[#E8D9C6] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">
                          {review.customerName || "Customer"}
                        </h4>

                        <span className="text-[#C9A978]">
                          {"★".repeat(review.rating)}
                        </span>
                      </div>

                      <p className="mt-3 text-[#7A6550]">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 border-t pt-6">
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="flex w-full items-center justify-between rounded-2xl bg-[#fbf6ef] px-5 py-4 text-left font-bold"
                >
                  <span>Leave a Review</span>
                  <span className="text-xl">
                    {showReviewForm ? "⌃" : "⌄"}
                  </span>
                </button>

                {showReviewForm && (
                  <div className="mt-5">
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="mb-4 w-full rounded-xl border p-3"
                    >
                      <option value={5}>★★★★★</option>
                      <option value={4}>★★★★</option>
                      <option value={3}>★★★</option>
                      <option value={2}>★★</option>
                      <option value={1}>★</option>
                    </select>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience..."
                      className="min-h-[110px] w-full rounded-xl border p-4"
                    />

                    <button
                      onClick={submitReview}
                      disabled={submitting}
                      className="mt-4 rounded-full bg-[#C9A978] px-8 py-4 font-bold text-white disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}