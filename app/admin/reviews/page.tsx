"use client";

import { useEffect, useState } from "react";

type Review = {
  _id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  approved: boolean;
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  async function fetchReviews() {
    const res = await fetch("/api/reviews?admin=true");
    const data = await res.json();
    setReviews(data.reviews || []);
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function updateReview(id: string, approved: boolean) {
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });

    fetchReviews();
  }

  async function deleteReview(id: string) {
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  }

  return (
    <main className="min-h-screen bg-[#fbf6ef] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-[#8b3a4a]">Admin Reviews</h1>

        <div className="mt-8 space-y-5">
          {reviews.map((review) => (
            <div key={review._id} className="rounded-[25px] bg-white p-6 shadow">
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="font-bold">{review.customerName}</h2>
                  <p className="text-sm text-gray-500">{review.customerEmail}</p>
                  <p className="mt-2">Rating: {review.rating}/5</p>
                  <p className="mt-2">{review.comment}</p>
                  <p className="mt-2 text-sm">
                    Status: {review.approved ? "Approved" : "Pending"}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateReview(review._id, true)}
                    className="rounded-full bg-green-100 px-4 py-2 text-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateReview(review._id, false)}
                    className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700"
                  >
                    Unapprove
                  </button>

                  <button
                    onClick={() => deleteReview(review._id)}
                    className="rounded-full bg-red-100 px-4 py-2 text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}