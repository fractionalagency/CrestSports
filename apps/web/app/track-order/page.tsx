"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api, Order } from "@/lib/api";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialTrackingId = searchParams.get("id") || "";
  
  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await api.getOrderByTrackingId(id);
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setError("Order not found. Please check your tracking ID.");
      }
    } catch (err) {
      console.error("Tracking error:", err);
      setError("Failed to track order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrackingId) {
      fetchOrder(initialTrackingId);
    }
  }, [initialTrackingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(trackingId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID (e.g., TRK-ABC123XYZ)"
              className="flex-1 px-4 py-2 border rounded-md focus:ring-black focus:border-black"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8 text-center">
            {error}
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-bold text-lg">{order.trackingId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                    order.status === "PAID" || order.status === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
