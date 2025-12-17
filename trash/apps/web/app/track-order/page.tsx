import { Suspense } from 'react';
import TrackOrderClient from './TrackOrderClient';

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    }>
      <TrackOrderClient />
    </Suspense>
  );
}
