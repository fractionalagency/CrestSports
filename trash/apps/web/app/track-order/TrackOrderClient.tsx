"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

interface OrderStatus {
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
  description: string;
}

export default function TrackOrderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  // Get order ID from URL params if available
  useEffect(() => {
    const urlOrderId = searchParams.get('orderId');
    if (urlOrderId) {
      setOrderId(urlOrderId);
      fetchOrder(urlOrderId);
    }
  }, [searchParams]);

  const fetchOrder = (id: string) => {
    setLoading(true);
    
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === id);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      alert('Order not found. Please check your order ID.');
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      fetchOrder(orderId.trim());
    }
  };

  const getStatusHistory = (): OrderStatus[] => {
    if (!order) return [];

    const orderDate = new Date(order.orderDate);
    const statuses: OrderStatus[] = [
      {
        status: 'processing',
        date: orderDate.toLocaleDateString(),
        description: 'Order confirmed and payment received'
      },
      {
        status: 'shipped',
        date: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: 'Order shipped and on the way'
      },
      {
        status: 'delivered',
        date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        description: 'Order delivered successfully'
      }
    ];

    // Filter to show only completed stages
    const today = new Date();
    const currentStatus = statuses.filter(status => 
      new Date(status.date) <= today
    );

    return currentStatus;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., 1234567890123)"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Track Order'}
              </button>
            </form>
          </div>

          {order ? (
            <>
              {/* Order Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Order #{order.id}</h2>
                    <p className="text-gray-600">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold">₹{order.totalAmount}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span className="font-medium">
                      {new Date(new Date(order.orderDate).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
                
                <div className="space-y-6">
                  {getStatusHistory().map((status, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index === getStatusHistory().length - 1 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getStatusIcon(status.status)}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-900 capitalize">
                            {status.status}
                          </h3>
                          <span className="text-sm text-gray-500">{status.date}</span>
                        </div>
                        <p className="text-gray-600">{status.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Status Card */}
                {getStatusHistory().length > 0 && (() => {
                  const statusHistory = getStatusHistory();
                  const currentStatus = statusHistory[statusHistory.length - 1];
                  if (!currentStatus) return null;
                  return (
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Current Status</h3>
                      <p className="text-blue-800">
                        {currentStatus.status === 'delivered' 
                          ? 'Your order has been successfully delivered! Thank you for shopping with us.' 
                          : currentStatus.status === 'shipped'
                          ? 'Your order is on the way! You should receive it soon.'
                          : 'Your order is being processed and will be shipped soon.'}
                      </p>
                    </div>
                  );
                })()}

                {/* Contact Help */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 mb-3">
                    If you have any questions about your order, please contact our customer service.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Email:</strong> support@crestsports.com
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> +91 9876543210
                    </p>
                    <p className="text-sm">
                      <strong>Working Hours:</strong> 9 AM - 6 PM, Monday to Friday
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            !loading && (
              <div className="bg-white rounded-lg p-12 shadow-sm text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Your Order Status</h2>
                <p className="text-gray-600 mb-8">
                  Enter your order ID above to track the status of your shipment and get real-time updates.
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
