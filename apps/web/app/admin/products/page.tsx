'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    isActive: boolean;
    imageUrl: string | null;
    category: {
        name: string;
    };
}

export default function ProductsPage() {
    const { token } = useAdminAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token, page, search]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '10',
            });

            if (search) {
                queryParams.append('search', search);
            }

            const response = await fetch(`${apiUrl}/api/v1/admin/products?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/products/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Products</h1>
                    <p className="text-slate-400 mt-2">Manage your product catalog</p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-slate-800/50">
                            <TableHead className="text-slate-400">Product</TableHead>
                            <TableHead className="text-slate-400">Category</TableHead>
                            <TableHead className="text-slate-400">Price</TableHead>
                            <TableHead className="text-slate-400">Stock</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 rounded-lg border border-slate-700">
                                                <AvatarImage src={product.imageUrl || ''} alt={product.name} />
                                                <AvatarFallback className="bg-slate-800 text-slate-400 rounded-lg">
                                                    {product.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-white">{product.name}</div>
                                                <div className="text-xs text-slate-500">{product.sku}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-300">{product.category?.name}</TableCell>
                                    <TableCell className="text-slate-300">₹{product.price.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-slate-300">{product.stock}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={product.isActive ? 'default' : 'secondary'}
                                            className={product.isActive ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20'}
                                        >
                                            {product.isActive ? 'Active' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                                                <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
                                                    onClick={() => router.push(`/product/${product.id}`)} // Public view
                                                >
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
                                                    onClick={() => router.push(`/admin/products/${product.id}`)}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit Product
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-slate-800" />
                                                <DropdownMenuItem
                                                    className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
                                                    onClick={() => handleToggleStatus(product.id)}
                                                >
                                                    {product.isActive ? 'Deactivate' : 'Activate'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
