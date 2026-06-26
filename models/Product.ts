import mongoose, { Schema, models } from "mongoose";

const VariantSchema = new Schema(
  {
    length: String,
    gram: String,
    price: Number,
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

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

    gram: String,
    grams: [String],

    variants: [VariantSchema],

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