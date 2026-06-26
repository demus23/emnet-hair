"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    compareAtPrice: "",
    category: "",
    tag: "",
    texture: "",
    textures: "",
    length: "",
    lengths: "",
    gram: "",
    grams: "",
    colors: "Natural Black, Custom Color",
    stock: "",
    description: "",
    care: "Use sulfate-free shampoo, Condition regularly, Avoid excessive heat, Store gently when not in use",
    video: "",
    rating: "5",
    reviews: "0",
    images: [] as string[],
    variants: "",
  });

  async function loadProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function uploadImage(file: File) {
    setUploading(true);

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    setUploading(false);

    if (json.url) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, json.url],
      }));
    } else {
      alert(json.error || "Upload failed");
    }
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product created");

      setForm({
        name: "",
        slug: "",
        price: "",
        compareAtPrice: "",
        category: "",
        tag: "",
        texture: "",
        textures: "",
        gram: "",
        grams: "",
        length: "",
        lengths: "",
        colors: "Natural Black, Custom Color",
        stock: "",
        description: "",
        care: "Use sulfate-free shampoo, Condition regularly, Avoid excessive heat, Store gently when not in use",
        video: "",
        rating: "5",
        reviews: "0",
        images: [],
        variants: "",
      });

      loadProducts();
    } else {
      alert(data.error || "Failed to create product");
    }
  }

  function editProduct(product: any) {
  setForm({
    name: product.name || "",
    slug: product.slug || "",
    price: String(product.price || ""),
    compareAtPrice: String(product.compareAtPrice || ""),
    category: product.category || "",
    tag: product.tag || "",
    texture: product.texture || "",
    textures: product.textures?.join(", ") || "",
    length: product.length || "",
    lengths: product.lengths?.join(", ") || "",
    gram: product.gram || "",
    grams: product.grams?.join(", ") || "",
    colors: product.colors?.join(", ") || "",
    stock: String(product.stock || ""),
    description: product.description || "",
    care: product.care?.join(", ") || "",
    video: product.video || "",
    rating: String(product.rating || "5"),
    reviews: String(product.reviews || "0"),
    images: product.images || [],
    _id: product._id,
    variants:
  product.variants
    ?.map(
      (v: any) =>
        `${v.length || ""} | ${v.gram || ""} | ${v.price || 0} | ${
          v.stock || 0
        }`
    )
    .join("\n") || "",
  } as any);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateProduct(e: React.FormEvent) {
  e.preventDefault();

  const res = await fetch("/api/admin/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Product updated");
    resetForm();
    loadProducts();
  } else {
    alert(data.error || "Failed to update product");
  }
}

async function deleteProduct(id: string) {
  const confirmDelete = confirm("Delete this product?");
  if (!confirmDelete) return;

  const res = await fetch("/api/admin/products", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    alert("Product deleted");
    loadProducts();
  } else {
    alert("Failed to delete product");
  }
}
function resetForm() {
  setForm({
    name: "",
    slug: "",
    price: "",
    compareAtPrice: "",
    category: "",
    tag: "",
    texture: "",
    textures: "",
    length: "",
    lengths: "",
    colors: "Natural Black, Custom Color",
    stock: "",
    description: "",
    care: "Use sulfate-free shampoo, Condition regularly, Avoid excessive heat, Store gently when not in use",
    video: "",
    rating: "5",
    reviews: "0",
    images: [],
  } as any);
}

  return (
    <main className="min-h-screen bg-[#F5EFE7] px-6 py-10 text-[#2C2018]">
      <section className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Admin Products</h1>

        <form onSubmit={(form as any)._id ? updateProduct : createProduct}
          className="mb-10 grid gap-4 rounded-3xl border border-[#E8D9C6] bg-white p-6 shadow md:grid-cols-2"
        >
          <input
            className="rounded-xl border p-3"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Slug e.g. deep-curly-human-hair"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Price AED"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Compare price"
            value={form.compareAtPrice}
            onChange={(e) =>
              setForm({ ...form, compareAtPrice: e.target.value })
            }
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Category e.g. Human Hair"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Tag e.g. Bold Curls"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Main texture e.g. Deep Curly"
            value={form.texture}
            onChange={(e) => setForm({ ...form, texture: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Textures comma separated e.g. Deep Curly, Kinky Curly"
            value={form.textures}
            onChange={(e) => setForm({ ...form, textures: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Main length e.g. 10 inch"
            value={form.length}
            onChange={(e) => setForm({ ...form, length: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Lengths comma separated e.g. 10 inch, 12 inch, 14 inch"
            value={form.lengths}
            onChange={(e) => setForm({ ...form, lengths: e.target.value })}
          />

          <input
  className="rounded-xl border p-3"
  placeholder="Main gram e.g. 100g"
  value={form.gram}
  onChange={(e) => setForm({ ...form, gram: e.target.value })}
/>

<input
  className="rounded-xl border p-3"
  placeholder="Grams comma separated e.g. 100g, 150g, 200g"
  value={form.grams}
  onChange={(e) => setForm({ ...form, grams: e.target.value })}
/>
<textarea
  className="rounded-xl border p-3 md:col-span-2"
  placeholder={`Variants: Length | Gram | Price | Stock
10 inch | 100g | 250 | 5
12 inch | 100g | 300 | 5
14 inch | 150g | 380 | 3`}
  value={(form as any).variants}
  onChange={(e) => setForm({ ...form, variants: e.target.value } as any)}
/>
          <input
            className="rounded-xl border p-3"
            placeholder="Colors comma separated"
            value={form.colors}
            onChange={(e) => setForm({ ...form, colors: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Stock e.g. 50"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Rating e.g. 4.9"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />

          <input
            className="rounded-xl border p-3"
            placeholder="Reviews e.g. 34"
            value={form.reviews}
            onChange={(e) => setForm({ ...form, reviews: e.target.value })}
          />

          <input
            className="rounded-xl border p-3 md:col-span-2"
            placeholder="Video URL optional"
            value={form.video}
            onChange={(e) => setForm({ ...form, video: e.target.value })}
          />

          <textarea
            className="rounded-xl border p-3 md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <textarea
            className="rounded-xl border p-3 md:col-span-2"
            placeholder="Care guide comma separated"
            value={form.care}
            onChange={(e) => setForm({ ...form, care: e.target.value })}
          />

          <div className="rounded-xl border p-4 md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Product Images
            </label>

            <input
              type="file"
              accept="image/*"
              className="mb-3 w-full rounded-xl border p-3"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
            />

            {uploading && (
              <p className="mb-3 text-sm text-[#7A6550]">Uploading...</p>
            )}

            <div className="flex flex-wrap gap-4">
              {form.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-32 w-32 rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute right-1 top-1 rounded-full bg-black px-2 py-1 text-xs text-white"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="rounded-xl bg-[#2C2018] p-4 font-semibold text-white md:col-span-2">
            {(form as any)._id ? "Update Product" : "Create Product"}
          </button>
        </form>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow"
            >
              <div>
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-sm text-[#7A6550]">
                  AED {product.price} · Stock {product.stock} · Images{" "}
                  {product.images?.length || 0}
                </p>
              </div>

              <div className="flex gap-3">
  <button
    onClick={() => editProduct(product)}
    className="rounded-full bg-[#C9A978] px-4 py-2 text-sm font-bold text-white"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(product._id)}
    className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white"
  >
    Delete
  </button>

  <span className="rounded-full bg-[#2C2018] px-4 py-2 text-sm text-white">
    {product.isActive ? "Active" : "Hidden"}
  </span>
</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}