"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: any;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
};

export default function QuickView({
  product,
  open,
  onClose,
  onAddToCart,
}: Props) {
  if (!open || !product) return null;

  const [selectedLength, setSelectedLength] = useState(
    product.lengths?.[0] || ""
  );

  const [selectedTexture, setSelectedTexture] = useState(
    product.textures?.[0] || ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-auto rounded-[40px] bg-[#f8f4ee] shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 h-12 w-12 rounded-full bg-white text-2xl font-bold shadow-lg"
        >
          ×
        </button>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="p-6">
            <div className="overflow-hidden rounded-[35px] bg-white shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                width={900}
                height={1000}
                className="h-[720px] w-full object-cover"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-8">

            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#c79b3b]">
              {product.category}
            </p>

            <h2 className="mt-4 text-5xl font-bold text-[#1f1512]">
              {product.name}
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-xl text-[#c79b3b]">
                ★★★★★
              </span>

              <span className="text-[#6c5a50]">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 text-4xl font-bold text-[#8b3a4a]">
              AED {product.price}
            </p>

            <p className="mt-6 leading-8 text-[#5f5147]">
              {product.detail}
            </p>

            {/* LENGTH */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                Length
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.lengths?.map((length: string) => (
                  <button
                    key={length}
                    onClick={() =>
                      setSelectedLength(length)
                    }
                    className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                      selectedLength === length
                        ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
                        : "border-[#d8cabb] bg-white text-[#5f5147]"
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            {/* TEXTURE */}
            <div className="mt-7">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                Texture
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.textures?.map(
                  (texture: string) => (
                    <button
                      key={texture}
                      onClick={() =>
                        setSelectedTexture(texture)
                      }
                      className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                        selectedTexture === texture
                          ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
                          : "border-[#d8cabb] bg-white text-[#5f5147]"
                      }`}
                    >
                      {texture}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* COLOR */}
            <div className="mt-7">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                      selectedColor === color
                        ? "border-[#c79b3b] bg-[#fff7e8] text-[#a97716]"
                        : "border-[#d8cabb] bg-white text-[#5f5147]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-7">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="h-11 w-11 rounded-full border border-[#d8cabb] bg-white text-xl font-bold"
                >
                  -
                </button>

                <span className="text-lg font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="h-11 w-11 rounded-full border border-[#d8cabb] bg-white text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4">

              <button
                onClick={() => {
                  onAddToCart({
                    ...product,
                    selectedLength,
                    selectedTexture,
                    selectedColor,
                    quantity,
                  });

                  onClose();
                }}
                className="rounded-full bg-gradient-to-r from-[#b98524] to-[#d6af55] px-8 py-5 text-center font-bold text-white"
              >
                Add to Cart
              </button>

              <Link
                href={`/products/${product.id}`}
                className="rounded-full border border-[#d8cabb] bg-white px-8 py-5 text-center font-bold text-[#1f1512]"
              >
                View Full Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}