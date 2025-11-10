import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    }>
      <OrderConfirmationClient />
    </Suspense>
  );
}
