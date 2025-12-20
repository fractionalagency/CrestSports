"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { api, type Product as ApiProduct } from "@/lib/api";
import { Playfair_Display, Parisienne } from "next/font/google";
import { Star, Minus, Plus, ArrowRight, X, ChevronDown, Truck, AlertCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
});

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
  description?: string;
  category?: string;
  allImages?: string[];
  stock: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
}

// Function to convert API product to display product
const convertApiProductToDetail = (apiProduct: ApiProduct): ProductDetail => {
  const metadata =
    (apiProduct.metadata as { rating?: number; discountPercentage?: number }) ||
    {};
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    originalPrice: apiProduct.salePrice || undefined,
    discountPercentage: metadata.discountPercentage,
    rating: metadata.rating || 0,
    imageUrl: apiProduct.imageUrl || apiProduct.images[0] || "",
    hoverImageUrl: apiProduct.images[1] || undefined,
    description:
      apiProduct.description ||
      "High-quality football jersey replica. Crafted from breathable fabric for optimal comfort and style.",
    category: apiProduct.category?.name || "Football Jerseys",
    allImages:
      apiProduct.images.length > 0
        ? apiProduct.images
        : [apiProduct.imageUrl || ""],
    stock: apiProduct.stock,
  };
};

const convertApiProductToCard = (apiProduct: ApiProduct): Product => {
  const metadata =
    (apiProduct.metadata as { rating?: number; discountPercentage?: number }) ||
    {};
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    originalPrice: apiProduct.salePrice || undefined,
    discountPercentage: metadata.discountPercentage,
    rating: metadata.rating || 0,
    imageUrl: apiProduct.imageUrl || apiProduct.images[0] || "",
    hoverImageUrl: apiProduct.images[1] || undefined,
  };
};

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-neutral-100">
    <button 
      onClick={onClick}
      className="w-full py-4 flex items-center justify-between text-left group"
    >
      <span className="text-sm font-bold uppercase tracking-widest group-hover:text-neutral-600 transition-colors">{title}</span>
      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
      <div className="text-sm text-neutral-600 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // UI States
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("description");

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getProductById(productId);

        if (response.success && response.data) {
          setProduct(convertApiProductToDetail(response.data));
        } else {
          console.error("Product not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await api.getProducts({ isActive: true, limit: 4 });
        if (response.success && response.data) {
          const filtered = response.data
            .filter((p) => p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(filtered.map(convertApiProductToCard));
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) return null;

  const productImages =
    product.allImages && product.allImages.length > 0
      ? product.allImages
      : [product.imageUrl, product.hoverImageUrl || product.imageUrl];

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      imageUrl: product.imageUrl,
      hoverImageUrl: product.hoverImageUrl,
      size: selectedSize,
    };

    addToCart(cartItem, quantity);
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const isLowStock = product.stock < 5 && product.stock > 0;

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Images (Editorial Style) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-50 rounded-sm">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-sm transition-all duration-300 ${
                    selectedImageIndex === index ? "opacity-100 ring-1 ring-black" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-8 pt-4">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500 uppercase tracking-widest flex-wrap">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link href="/product" className="hover:text-black transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-black">{product.category}</span>
              </div>
              
              <h1 className={`${playfair.className} text-4xl md:text-5xl text-neutral-900 leading-tight`}>
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-medium text-neutral-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-black" : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4">
                  {product.rating} (45 Reviews)
                </span>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-6 border-t border-neutral-100 pt-6">
              {/* Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest">Size</span>
                    {isLowStock && (
                      <span className="text-xs font-medium text-red-600 flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Only {product.stock} left!
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-neutral-500 underline hover:text-black"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all duration-200 rounded-sm ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white border border-neutral-200 text-neutral-900 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
                <div className="flex items-center w-32 border border-neutral-200 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 group rounded-sm"
              >
                Add to Cart
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Delivery Estimator */}
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-sm text-sm text-neutral-600">
                <Truck className="w-5 h-5 text-neutral-400" />
                <p>
                  Order now to receive by <span className="font-semibold text-neutral-900">{getDeliveryDate()}</span>
                </p>
              </div>
            </div>

            {/* Collapsible Details */}
            <div className="border-t border-neutral-100 mt-8">
              <AccordionItem 
                title="Description" 
                isOpen={openAccordion === "description"}
                onClick={() => setOpenAccordion(openAccordion === "description" ? "" : "description")}
              >
                {product.description}
              </AccordionItem>
              
              <AccordionItem 
                title="Material & Care" 
                isOpen={openAccordion === "material"}
                onClick={() => setOpenAccordion(openAccordion === "material" ? "" : "material")}
              >
                <ul className="list-disc pl-4 space-y-1">
                  <li>100% Recycled Polyester</li>
                  <li>Machine wash cold</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low</li>
                  <li>Cool iron if needed</li>
                </ul>
              </AccordionItem>

              <AccordionItem 
                title="Shipping & Returns" 
                isOpen={openAccordion === "shipping"}
                onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
              >
                <p className="mb-2">Free standard shipping on orders over ₹2000.</p>
                <p>Returns accepted within 30 days of delivery. Items must be unworn and in original packaging.</p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-20 border-t border-neutral-100 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className={`${parisienne.className} text-2xl text-neutral-500 block mb-2`}>
                Complete the look
              </span>
              <h2 className={`${playfair.className} text-3xl md:text-4xl text-neutral-900`}>
                You May Also Like
              </h2>
            </div>
            <Link href="/product" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:underline mb-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discountPercentage={product.discountPercentage}
                rating={product.rating}
                imageUrl={product.imageUrl}
                hoverImageUrl={product.hoverImageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 md:hidden z-40 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">Total</span>
          <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm"
        >
          Add to Cart
        </button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h3 className={`${playfair.className} text-2xl`}>Size Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-neutral-500 uppercase bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Chest (in)</th>
                      <th className="px-4 py-3">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr><td className="px-4 py-3 font-medium">S</td><td className="px-4 py-3">36-38</td><td className="px-4 py-3">27</td></tr>
                    <tr><td className="px-4 py-3 font-medium">M</td><td className="px-4 py-3">38-40</td><td className="px-4 py-3">28</td></tr>
                    <tr><td className="px-4 py-3 font-medium">L</td><td className="px-4 py-3">40-42</td><td className="px-4 py-3">29</td></tr>
                    <tr><td className="px-4 py-3 font-medium">XL</td><td className="px-4 py-3">42-44</td><td className="px-4 py-3">30</td></tr>
                    <tr><td className="px-4 py-3 font-medium">XXL</td><td className="px-4 py-3">44-46</td><td className="px-4 py-3">31</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                Measurements are in inches. If you are between sizes, we recommend sizing up for a looser fit.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
