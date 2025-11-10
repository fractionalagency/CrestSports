"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Order {
  id: string;
  items: any[];
  shippingCost: number;
  tax: number;
  totalAmount: number;
  customerInfo: any;
  paymentMethod: string;
  orderDate: string;
}

export default function OrderConfirmationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      router.push('/');
      return;
    }

    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      router.push('/');
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase, {order.customerInfo.firstName}!
            </p>
            <p className="text-gray-600">
              Your order #{order.id} has been successfully placed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Order Details</h2>
            
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
                <div className="text-gray-600 space-y-1">
                  <p>
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </p>
                  <p>{order.customerInfo.address}</p>
                  <p>
                    {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.postalCode}
                  </p>
                  <p>{order.customerInfo.phone}</p>
                  <p>{order.customerInfo.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">{order.items.length} items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} • Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">₹{item.price} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.totalAmount - order.shippingCost - order.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{order.shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <div className="space-y-2 text-gray-700">
              {order.paymentMethod === 'cod' ? (
                <>
                  <p>📦 Your order will be prepared for shipping within 2-3 business days.</p>
                  <p>💰 Pay ₹{order.totalAmount} when your order is delivered.</p>
                  <p>📍 You'll receive a tracking link when your order ships.</p>
                </>
              ) : (
                <>
                  <p>📦 Your order will be prepared for shipping within 2-3 business days.</p>
                  <p>📱 You'll receive SMS updates about your order status.</p>
                  <p>📍 Tracking details will be sent to your registered email.</p>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href={{
                pathname: '/track-order',
                query: { orderId: order.id }
              }}
              className="px-6 py-3 border border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-colors text-center"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
