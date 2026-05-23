"use client";

import Link from "next/link";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import SocialProof from "@/components/SocialProof";
import Promotions from "@/components/Promotions";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";

import { products } from "@/data/products";

import { getCart, saveCart, type Product } from "@/lib/cart";
import { notifyCartUpdated } from "@/lib/events";

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedTexture, setSelectedTexture] =
    useState("All");

  const [selectedLength, setSelectedLength] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("featured");

  function addToCart(product: Product) {
    const cart = getCart();

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );

      saveCart(updatedCart);
    } else {
      saveCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    notifyCartUpdated();
  }

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All"
        ? true
        : product.category === selectedCategory
    )

    .filter((product) =>
      selectedTexture === "All"
        ? true
        : product.textures.includes(
            selectedTexture
          )
    )

    .filter((product) =>
      selectedLength === "All"
        ? true
        : product.lengths.includes(
            selectedLength
          )
    )

    .sort((a, b) => {
      if (sortBy === "price-low")
        return a.price - b.price;

      if (sortBy === "price-high")
        return b.price - a.price;

      if (sortBy === "rating")
        return b.rating - a.rating;

      if (sortBy === "stock")
        return b.stock - a.stock;

      return a.id - b.id;
    });

  return (
    <main className="min-h-screen bg-[#f8f4ee]">
      <Navbar />

      <Hero />

     <ProductCatalog />

      <BrandStory />

      <SocialProof />

      <Promotions />

      <Education />

      <Footer />
    </main>
  );
}