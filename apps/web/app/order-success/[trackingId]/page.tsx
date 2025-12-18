"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api, Order } from "@/lib/api";
import Image from "next/image";

export default function OrderSuccessPage() {
  const params = useParams();
  const trackingId = params.trackingId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.getOrderByTrackingId(trackingId);
        if (response.success && response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchOrder();
    }
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="bg-white p-8 rounded-t-lg shadow-sm text-center border-b">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase{order ? `, ${order.customerName.split(" ")[0]}` : ""}.
          </p>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            You will receive an email shortly with a confirmation and shipping details.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white p-8 rounded-b-lg shadow-sm space-y-8">
          {/* Tracking Info */}
          <div className="bg-gray-50 p-4 rounded-md flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Order Tracking ID</p>
              <p className="font-mono font-bold text-lg tracking-wider">
                {trackingId}
              </p>
            </div>
            <Link
              href={`/track-order?id=${trackingId}`}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Track Order Status
            </Link>
          </div>

          {/* Order Items */}
          {order && (
            <div>
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="relative w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {item.product.imageUrl && (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium">₹{item.total}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          {order && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? "Free" : `₹${order.shippingCost}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          )}

          {/* Shipping Address */}
          {order && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">Shipping Details</h3>
              <div className="text-gray-600 text-sm">
                <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-6">
            <Link
              href="/"
              className="block w-full bg-black text-white text-center py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
