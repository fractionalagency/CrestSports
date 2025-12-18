"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/ui/image-upload";

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Image Upload Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Single Image</h2>
            <p className="text-sm text-gray-500 mb-4">
              Upload a single image to the 'products' bucket.
            </p>
            <ImageUpload
              value={images.slice(0, 1)}
              onChange={(newImages) => setImages(newImages)}
              onRemove={(url) => setImages(images.filter((i) => i !== url))}
              maxFiles={1}
            />
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-2">Multiple Images</h2>
            <p className="text-sm text-gray-500 mb-4">
              Upload multiple images (max 5).
            </p>
            <ImageUpload
              value={images}
              onChange={(newImages) => setImages(newImages)}
              onRemove={(url) => setImages(images.filter((i) => i !== url))}
              maxFiles={5}
            />
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-2">Result URLs</h2>
            <div className="bg-gray-100 p-4 rounded-md overflow-auto">
              <pre className="text-xs">{JSON.stringify(images, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
