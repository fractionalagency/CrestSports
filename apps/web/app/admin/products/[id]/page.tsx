'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ProductForm } from '@/components/admin/ProductForm';

interface Category {
    id: string;
    name: string;
}

export default function EditProductPage() {
    const params = useParams();
    const { token } = useAdminAuth();
    const [product, setProduct] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

                const [productRes, categoriesRes] = await Promise.all([
                    fetch(`${apiUrl}/api/v1/admin/products/${params.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${apiUrl}/api/v1/admin/categories`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (productRes.ok && categoriesRes.ok) {
                    const [productData, categoriesData] = await Promise.all([
                        productRes.json(),
                        categoriesRes.json(),
                    ]);
                    setProduct(productData);
                    setCategories(categoriesData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token && params.id) {
            fetchData();
        }
    }, [token, params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-white">Product not found</h2>
                <p className="text-slate-400">The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Edit Product</h1>
                <p className="text-slate-400 mt-2">Update product details</p>
            </div>

            <ProductForm
                initialData={product}
                categories={categories}
                isEditing={true}
            />
        </div>
    );
}
