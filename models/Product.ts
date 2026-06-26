import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: 0 },

    description: String,
    category: String,
    tag: String,

    texture: String,
    textures: [String],

    length: String,
    lengths: [String],

    colors: [String],
    care: [String],

    stock: { type: Number, default: 0 },

    images: [String],
    video: String,

    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);