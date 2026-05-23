export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  gallery?: string[];
  video?: string;
  lengths?: string[];
  textures?: string[];
  colors?: string[];
  selectedLength?: string;
  selectedTexture?: string;
  selectedColor?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  detail?: string;
  care?: string[];
  quantity?: number;
};

export function getCart(): Product[] {
  if (typeof window === "undefined") return [];

  const savedCart = localStorage.getItem("emnetCart");
  return savedCart ? JSON.parse(savedCart) : [];
}

export function saveCart(cart: Product[]) {
  localStorage.setItem("emnetCart", JSON.stringify(cart));
}