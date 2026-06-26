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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1410]/60 p-6 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-auto border border-[#E3D9C9] bg-[#F7F3ED]">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center border border-[#E3D9C9] bg-white text-xl text-[#1C1410]"
        >
          ×
        </button>

        <div className="grid gap-px md:grid-cols-2">
          {/* IMAGE */}
          <div className="bg-white p-6">
            <div className="overflow-hidden bg-[#E3D9C9]">
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
          <div className="flex flex-col justify-center bg-[#F7F3ED] p-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[#A8895F]">
              {product.category}
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#1C1410]">
              {product.name}
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <span className="text-base text-[#A8895F]">★★★★★</span>

              <span className="text-[14px] text-[#5E5248]">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 font-serif text-3xl text-[#5C2A2E]">
              AED {product.price}
            </p>

            <p className="mt-6 text-[15px] leading-7 text-[#5E5248]">
              {product.detail}
            </p>

            {/* LENGTH */}
            <div className="mt-9">
              <h3 className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#1C1410]">
                Length
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.lengths?.map((length: string) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`border px-5 py-3 text-[13px] font-medium transition ${
                      selectedLength === length
                        ? "border-[#A8895F] bg-[#A8895F] text-white"
                        : "border-[#E3D9C9] bg-white text-[#5E5248]"
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            {/* TEXTURE */}
            <div className="mt-7">
              <h3 className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#1C1410]">
                Texture
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.textures?.map((texture: string) => (
                  <button
                    key={texture}
                    onClick={() => setSelectedTexture(texture)}
                    className={`border px-5 py-3 text-[13px] font-medium transition ${
                      selectedTexture === texture
                        ? "border-[#A8895F] bg-[#A8895F] text-white"
                        : "border-[#E3D9C9] bg-white text-[#5E5248]"
                    }`}
                  >
                    {texture}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="mt-7">
              <h3 className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#1C1410]">
                Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-5 py-3 text-[13px] font-medium transition ${
                      selectedColor === color
                        ? "border-[#A8895F] bg-[#A8895F] text-white"
                        : "border-[#E3D9C9] bg-white text-[#5E5248]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-7">
              <h3 className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#1C1410]">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-11 w-11 items-center justify-center border border-[#E3D9C9] bg-white text-lg text-[#1C1410]"
                >
                  -
                </button>

                <span className="text-[15px] font-medium text-[#1C1410]">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center border border-[#E3D9C9] bg-white text-lg text-[#1C1410]"
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
                className="border border-[#1C1410] bg-[#1C1410] px-8 py-5 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-transparent hover:text-[#1C1410]"
              >
                Add to cart
              </button>

              <Link
                href={`/products/${product.id}`}
                className="border border-[#E3D9C9] bg-white px-8 py-5 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-[#1C1410] transition hover:border-[#1C1410]"
              >
                View full product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}