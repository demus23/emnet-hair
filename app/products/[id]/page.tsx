"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getCart, saveCart, type Product as CartProduct } from "@/lib/cart";
import { getWishlist, saveWishlist } from "@/lib/wishlist";
import {
  notifyCartUpdated,
  notifyWishlistUpdated,
} from "@/lib/events";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const resolvedParams = use(params);

  const product = products.find(
    (item) => item.id === Number(resolvedParams.id)
  );

  if (!product) {
    notFound();
  }
  const productItem = product as CartProduct;
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedLength, setSelectedLength] = useState(product.lengths[0]);
  const [selectedTexture, setSelectedTexture] = useState(product.textures[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  function addToCart() {
  const cart = getCart();

  const selectedProduct = {
    ...productItem,
    selectedLength,
selectedTexture,
selectedColor,
    quantity,
  };

  const existingItem = cart.find(
    (item) => item.id === selectedProduct.id &&
item.selectedLength === selectedLength &&
item.selectedTexture === selectedTexture &&
item.selectedColor === selectedColor
  );

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.id === selectedProduct.id &&
item.selectedLength === selectedLength &&
item.selectedTexture === selectedTexture &&
item.selectedColor === selectedColor
        ? { ...item, quantity: (item.quantity || 1) + quantity }
        : item
    );

    saveCart(updatedCart);
  } else {
    saveCart([...cart, selectedProduct]);
  }

  notifyCartUpdated();
}

function addToWishlist() {
  const wishlist = getWishlist();

  const exists = wishlist.some((item) => item.id === productItem.id);

  if (exists) {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== productItem.id
    );

    saveWishlist(updatedWishlist);
  } else {
    saveWishlist([...wishlist, productItem]);
  }

  notifyWishlistUpdated();
}

  return (
    <main className="min-h-screen bg-[#f8f4ee] px-6 py-8 text-[#1f1512] md:px-14">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between border-b border-[#e7ddd1] pb-5">
          <Link href="/" className="text-3xl font-bold tracking-[0.25em]">
            EMNET
            <span className="block text-center text-xs tracking-[0.4em] text-[#c79b3b]">
              HAIR
            </span>
          </Link>

          <div className="flex gap-6 text-sm font-semibold">
            <Link href="/">Home</Link>
            <Link href="/#products">Shop</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </nav>

        <div className="mb-8 text-sm text-[#8b7b70]">
          Home / Shop / {product.category} /{" "}
          <span className="text-[#1f1512]">{product.name}</span>
        </div>

        <section className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="group relative overflow-hidden rounded-[32px] border border-[#e7ddd1] bg-white shadow-xl">
              <span className="absolute left-6 top-6 z-10 rounded-full bg-[#c79b3b] px-5 py-2 text-sm font-bold text-white">
                {product.tag}
              </span>

              <Image
                src={selectedImage}
                alt={product.name}
                width={900}
                height={1000}
                className="h-[620px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-5 grid grid-cols-4 gap-3 md:grid-cols-5">
              {product.gallery.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`overflow-hidden rounded-2xl border bg-white p-1 transition ${
                    selectedImage === img
                      ? "border-[#c79b3b] shadow-md"
                      : "border-[#e7ddd1]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="h-24 w-full rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>

            {product.video && (
              <div className="mt-6 overflow-hidden rounded-[30px] border border-[#e7ddd1] bg-white p-4 shadow-sm">
                <video
                  src={product.video}
                  controls
                  muted
                  className="h-[280px] w-full rounded-2xl object-cover"
                />
              </div>
            )}

            <div className="mt-6 grid gap-4 rounded-3xl border border-[#e7ddd1] bg-white p-5 shadow-sm md:grid-cols-3">
              <div>
                <p className="font-bold">Premium Quality</p>
                <p className="text-sm text-[#8b7b70]">
                  100% Virgin Human Hair
                </p>
              </div>

              <div>
                <p className="font-bold">Secure Payment</p>
                <p className="text-sm text-[#8b7b70]">Safe checkout</p>
              </div>

              <div>
                <p className="font-bold">Fast Delivery</p>
                <p className="text-sm text-[#8b7b70]">UAE & worldwide</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
                {product.tag}
              </p>

              <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight md:text-6xl">
                {product.name}
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-xl text-[#c79b3b]">★★★★★</span>

                <span className="text-[#5f5147]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <p className="text-4xl font-bold text-[#c79b3b]">
                  AED {product.price}
                </p>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5147]">
                {product.detail}
              </p>

              <div className="mt-9">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                  Available Lengths
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.lengths.map((length, index) => (
                    <button
  key={length}
  onClick={() => setSelectedLength(length)}
  className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${
    selectedLength === length
      ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
      : "border-[#e7ddd1] bg-white text-[#5f5147]"
  }`}
>
  {length}
</button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                  Texture
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.textures.map((texture) => (
                    <button
  key={texture}
  onClick={() => setSelectedTexture(texture)}
  className={`rounded-full border px-6 py-3 text-sm font-semibold ${
    selectedTexture === texture
      ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
      : "border-[#e7ddd1] bg-white text-[#5f5147]"
  }`}
>
  {texture}
</button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                  Color
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
  key={color}
  onClick={() => setSelectedColor(color)}
  className={`rounded-full border px-6 py-3 text-sm font-semibold ${
    selectedColor === color
      ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
      : "border-[#e7ddd1] bg-white text-[#5f5147]"
  }`}
>
  {color}
</button>
                  ))}
                </div>
              </div>

<div className="mt-7">
  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
    Quantity
  </h3>

  <div className="flex items-center gap-4">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="h-11 w-11 rounded-full border border-[#e7ddd1] bg-white font-bold"
    >
      -
    </button>

    <span className="text-lg font-bold">{quantity}</span>

    <button
      onClick={() => setQuantity(quantity + 1)}
      className="h-11 w-11 rounded-full border border-[#e7ddd1] bg-white font-bold"
    >
      +
    </button>
  </div>
</div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={addToCart}
                  className="flex-1 rounded-full bg-gradient-to-r from-[#b98524] to-[#d6af55] px-8 py-4 font-bold text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Add to Cart
                </button>

                <button
                  onClick={addToWishlist}
                  className="flex-1 rounded-full border border-[#e7ddd1] bg-white px-8 py-4 font-bold text-[#1f1512] transition hover:border-[#c79b3b]"
                >
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-10 rounded-3xl border border-[#e7ddd1] bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Detail & Care</h3>

                <ul className="mt-5 space-y-3 text-[#5f5147]">
                  {product.care.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-[#c79b3b]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}