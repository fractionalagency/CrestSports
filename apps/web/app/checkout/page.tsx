"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { api, CreateOrderDto } from "@/lib/api";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const initialForm: CheckoutForm = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (!isOrderPlaced && cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cart.items.length, router, isOrderPlaced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Load Razorpay Script
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      setError("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      const orderData: CreateOrderDto = {
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: {
          fullName: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          addressLine1: form.address,
          addressLine2: form.apartment,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          country: "India",
        },
        items: cart.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      // 1. Create Order
      const response = await api.createOrder(orderData);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to create order");
      }

      const order = response.data;

      // 2. Create Payment Order
      const paymentResponse = await api.createPaymentOrder(order.id);

      if (!paymentResponse.success || !paymentResponse.data) {
        throw new Error(paymentResponse.message || "Failed to initiate payment");
      }

      const { razorpayOrderId, amount, currency } = paymentResponse.data;

      // 3. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Crest Sports",
        description: `Order #${order.trackingId}`,
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await api.verifyPayment({
              orderId: order.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResponse.success) {
              setIsOrderPlaced(true);
              clearCart();
              router.push(`/order-success/${order.trackingId}`);
            } else {
              setError("Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            setError("Payment verification failed");
          }
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
    // Note: We don't set loading(false) here immediately because we want to wait for the modal
    // But since paymentObject.open() doesn't return a promise that resolves on close, 
    // we handle setLoading(false) in error case and in modal.ondismiss (if supported/working)
    // or we just accept the button is disabled until refresh if ondismiss doesn't fire.
    // Ideally Razorpay options has "modal: { ondismiss: ... }"
  };

  if (!isOrderPlaced && cart.items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="pt-6 border-t">
                <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={form.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing this order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>₹{cart.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
