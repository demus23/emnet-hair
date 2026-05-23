import type { Product } from "./cart";

export function getWishlist(): Product[] {
  if (typeof window === "undefined") return [];

  const savedWishlist = localStorage.getItem("emnetWishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
}

export function saveWishlist(wishlist: Product[]) {
  localStorage.setItem("emnetWishlist", JSON.stringify(wishlist));
}

export function isInWishlist(productId: number): boolean {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === productId);
}