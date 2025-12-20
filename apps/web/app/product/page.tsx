"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api, type Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function ProductsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("All Products");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let categoryId: string | undefined;
        let pageTitle = "All Products";

        if (categorySlug) {
          // Fetch categories to find the ID
          const categoriesRes = await api.getCategories();
          if (categoriesRes.success && categoriesRes.data) {
            const category = categoriesRes.data.find(
              (c) => c.slug.toLowerCase() === categorySlug.toLowerCase() || 
                     c.name.toLowerCase().includes(categorySlug.toLowerCase())
            );
            
            if (category) {
              categoryId = category.id;
              pageTitle = category.name;
            } else {
               // Fallback title if category not found but slug exists
               pageTitle = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
            }
          }
        }

        const productsRes = await api.getProducts({
          categoryId,
          isActive: true,
          limit: 50 // Fetch more for the main page
        });

        if (productsRes.success && productsRes.data) {
          setProducts(productsRes.data);
        }
        
        setTitle(pageTitle);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className={`${playfair.className} text-4xl md:text-5xl text-neutral-900 mb-4`}>
            {title}
          </h1>
          <p className="text-neutral-500">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.salePrice || undefined}
                discountPercentage={
                  (product.metadata as any)?.discountPercentage
                }
                rating={(product.metadata as any)?.rating || 0}
                imageUrl={product.imageUrl || product.images[0] || ""}
                hoverImageUrl={product.images[1]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
