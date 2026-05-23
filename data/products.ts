export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  tag: string;

  image: string;

  gallery: string[];

  video?: string;

  lengths: string[];
  textures: string[];
  colors: string[];

  stock: number;

  rating: number;
  reviews: number;

  detail: string;

  care: string[];
};

export const products: Product[] = [
  {
    id: 1,

    name: "Deep Curly Virgin Human Hair",

    price: 380,

    category: "Human Hair",

    tag: "Bold Curls",

    image: "/products/deep-curly.jpg",

    gallery: [
      "/products/deep-curly.jpg",
      "/products/deep-curly-1.jpg",
      "/products/deep-curly-2.jpg",
    ],

    video: "/products/deep-curly-video.mp4",

    lengths: [
      "10 inch",
      "12 inch",
      "14 inch",
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
      "26 inch",
      "28 inch",
      "30 inch",
    ],

    textures: ["Deep Curly"],

    colors: ["Natural Black", "Custom Color"],

    stock: 15,

    rating: 4.9,

    reviews: 34,

    detail:
      "100% virgin human hair with bold, defined deep curls. Full from top to bottom, soft, shiny, true to length, with minimal shedding and no tangling.",

    care: [
      "Wash with conditioner only.",
      "Brush with fingers or wide comb.",
      "Moisturize curls regularly.",
      "Can be dyed and styled carefully.",
      "Lasts up to 18 months with proper care.",
    ],
  },

  {
    id: 2,

    name: "Soft Curly Virgin Human Hair",

    price: 360,

    category: "Human Hair",

    tag: "Soft Natural Curls",

    image: "/products/soft-curly.jpg",

    gallery: [
      "/products/soft-curly.jpg",
      "/products/soft-curly-1.jpg",
      "/products/soft-curly-2.jpg",
    ],

    video: "/products/soft-curly-video.mp4",

    lengths: [
      "12 inch",
      "14 inch",
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
      "26 inch",
    ],

    textures: ["Soft Curly"],

    colors: ["Natural Black", "Dye-Friendly"],

    stock: 12,

    rating: 4.8,

    reviews: 29,

    detail:
      "Soft curly virgin human hair with romantic natural curls. Lightweight, soft to touch, and tangle-free.",

    care: [
      "Wash gently with conditioner.",
      "Use minimal styling products.",
      "Brush carefully with fingers.",
      "Maintain moisture for soft curls.",
    ],
  },

  {
    id: 3,

    name: "Loose Curly Virgin Human Hair",

    price: 350,

    category: "Human Hair",

    tag: "Natural Volume",

    image: "/products/loose-curly.jpg",

    gallery: [
      "/products/loose-curly.jpg",
      "/products/loose-curly-1.jpg",
      "/products/loose-curly-2.jpg",
    ],

    video: "/products/loose-curly-video.mp4",

    lengths: [
      "10 inch",
      "12 inch",
      "14 inch",
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
      "26 inch",
      "28 inch",
    ],

    textures: ["Loose Curly"],

    colors: ["Natural Black", "Custom Color"],

    stock: 10,

    rating: 4.8,

    reviews: 22,

    detail:
      "Loose curly virgin human hair with relaxed flowing curls and natural volume. Can be styled curly or straight.",

    care: [
      "Wash with conditioner.",
      "Brush using wide brush.",
      "Can be styled and dyed.",
      "Use moderate heat carefully.",
    ],
  },

  {
    id: 4,

    name: "Water Wavy Virgin Human Hair",

    price: 340,

    category: "Human Hair",

    tag: "Beachy Waves",

    image: "/products/water-wave.jpg",

    gallery: [
      "/products/water-wave.jpg",
      "/products/water-wave-1.jpg",
      "/products/water-wave-2.jpg",
    ],

    video: "/products/water-wave-video.mp4",

    lengths: [
      "10 inch",
      "12 inch",
      "14 inch",
      "16 inch",
      "18 inch",
      "20 inch",
    ],

    textures: ["Water Wavy"],

    colors: ["Natural Black", "Custom Color"],

    stock: 14,

    rating: 4.7,

    reviews: 31,

    detail:
      "Soft flowing water wavy human hair with natural beachy movement and glossy shine.",

    care: [
      "Wash gently with conditioner.",
      "Use moisturizing products.",
      "Avoid aggressive brushing.",
      "Can be styled wet or dry.",
    ],
  },

  {
    id: 5,

    name: "Wavy Virgin Human Hair",

    price: 330,

    category: "Human Hair",

    tag: "Soft & Shiny",

    image: "/products/wavy.jpg",

    gallery: [
      "/products/wavy.jpg",
      "/products/wavy-1.jpg",
      "/products/wavy-2.jpg",
    ],

    video: "/products/wavy-video.mp4",

    lengths: [
      "10 inch",
      "12 inch",
      "14 inch",
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
      "26 inch",
    ],

    textures: ["Wavy"],

    colors: ["Natural Black", "Custom Color"],

    stock: 18,

    rating: 4.7,

    reviews: 20,

    detail:
      "True-to-length virgin human hair with soft shiny waves and natural movement.",

    care: [
      "Wash with conditioner.",
      "Brush gently.",
      "Can be dyed and styled.",
      "Store properly after use.",
    ],
  },

  {
    id: 6,

    name: "Customized Ponytail",

    price: 280,

    category: "Ponytail",

    tag: "Custom Made",

    image: "/products/ponytail.jpg",

    gallery: [
      "/products/ponytail.jpg",
      "/products/ponytail-1.jpg",
      "/products/ponytail-2.jpg",
    ],

    video: "/products/ponytail-video.mp4",

    lengths: ["Standard 200g", "Custom Length"],

    textures: ["Wavy", "Curly", "Custom Texture"],

    colors: ["Natural Black", "Custom Color"],

    stock: 8,

    rating: 4.8,

    reviews: 17,

    detail:
      "Customized premium ponytail with full volume from top to bottom and natural finish.",

    care: [
      "Wash gently with shampoo.",
      "Brush while holding the top.",
      "Store carefully after use.",
      "Customize texture upon request.",
    ],
  },

  {
    id: 7,

    name: "Handmade Wig",

    price: 650,

    category: "Wigs",

    tag: "Handmade Luxury",

    image: "/products/wig.jpg",

    gallery: [
      "/products/wig.jpg",
      "/products/wig-1.jpg",
      "/products/wig-2.jpg",
    ],

    video: "/products/wig-video.mp4",

    lengths: ["Custom Length"],

    textures: ["Straight", "Wavy", "Curly"],

    colors: ["Natural Black", "Custom Color"],

    stock: 5,

    rating: 4.9,

    reviews: 12,

    detail:
      "Handmade wigs customized to fit customer preferences with luxury finish and styling.",

    care: [
      "Store on wig stand.",
      "Wash gently.",
      "Avoid excessive heat.",
      "Handle lace carefully.",
    ],
  },

  {
    id: 8,

    name: "Clip-In Extensions",

    price: 420,

    category: "Extensions",

    tag: "Easy Wear",

    image: "/products/clipin.jpg",

    gallery: [
      "/products/clipin.jpg",
      "/products/clipin-1.jpg",
      "/products/clipin-2.jpg",
    ],

    video: "/products/clipin-video.mp4",

    lengths: [
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
    ],

    textures: ["Straight", "Wavy", "Curly"],

    colors: ["Natural Black", "Custom Color"],

    stock: 10,

    rating: 4.8,

    reviews: 19,

    detail:
      "High-quality clip-in extensions that are easy to install, remove, and style.",

    care: [
      "Brush before and after use.",
      "Store safely.",
      "Avoid sleeping with clip-ins.",
      "Can be customized by color.",
    ],
  },
];