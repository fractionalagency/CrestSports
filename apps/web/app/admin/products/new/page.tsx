'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { ProductForm } from '@/components/admin/ProductForm';

interface Category {
    id: string;
    name: string;
}

export default function NewProductPage() {
    const { token } = useAdminAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/v1/admin/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchCategories();
        }
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                <p className="text-slate-400 mt-2">Create a new product in your catalog</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
