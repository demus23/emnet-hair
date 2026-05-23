export const CART_UPDATED_EVENT = "emnet-cart-updated";
export const WISHLIST_UPDATED_EVENT = "emnet-wishlist-updated";

export function notifyCartUpdated() {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function notifyWishlistUpdated() {
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}