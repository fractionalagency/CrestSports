'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().optional(),
    price: z.coerce.number().min(0, 'Price must be positive'),
    salePrice: z.coerce.number().min(0, 'Sale price must be positive').optional().or(z.literal('')),
    stock: z.coerce.number().int().min(0, 'Stock must be a positive integer'),
    sku: z.string().min(2, 'SKU is required'),
    categoryId: z.string().min(1, 'Category is required'),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    imageUrl: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Category {
    id: string;
    name: string;
}

interface ProductFormProps {
    initialData?: any;
    categories: Category[];
    isEditing?: boolean;
}

export function ProductForm({ initialData, categories, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const { token } = useAdminAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            price: initialData?.price || 0,
            salePrice: initialData?.salePrice || '',
            stock: initialData?.stock || 0,
            sku: initialData?.sku || '',
            categoryId: initialData?.categoryId || '',
            isActive: initialData?.isActive ?? true,
            isFeatured: initialData?.isFeatured ?? false,
            imageUrl: initialData?.imageUrl || '',
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const url = isEditing
                ? `${apiUrl}/api/v1/admin/products/${initialData.id}`
                : `${apiUrl}/api/v1/admin/products`;

            const method = isEditing ? 'PUT' : 'POST';

            // Clean up data
            const payload = {
                ...data,
                salePrice: data.salePrice === '' ? null : Number(data.salePrice),
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save product');
            }

            router.push('/admin/products');
            router.refresh();
        } catch (error) {
            console.error('Error saving product:', error);
            // You could add toast notification here
        } finally {
            setIsLoading(false);
        }
    };

    // This is a placeholder for image upload logic
    // In a real app, you would upload to S3/Cloudinary and get a URL back
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For demo purposes, we'll just use a fake URL or base64 if needed
            // Ideally, implement actual file upload here
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                // In a real scenario, you'd upload the file and set the URL
                // form.setValue('imageUrl', uploadedUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-6 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Premium Cricket Bat" {...field} className="bg-slate-800 border-slate-700 text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Product description..."
                                                    className="min-h-[120px] bg-slate-800 border-slate-700 text-white"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Price (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="0" step="0.01" {...field} className="bg-slate-800 border-slate-700 text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="salePrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Sale Price (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="0" step="0.01" {...field} value={field.value || ''} className="bg-slate-800 border-slate-700 text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-6 space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">SKU</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. BAT-001" {...field} className="bg-slate-800 border-slate-700 text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Stock Quantity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="0" {...field} className="bg-slate-800 border-slate-700 text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-6 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base text-white">Active Status</FormLabel>
                                                <FormDescription className="text-slate-400">
                                                    Product will be visible in store
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base text-white">Featured</FormLabel>
                                                <FormDescription className="text-slate-400">
                                                    Show on home page
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-6 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-6 space-y-4">
                                <FormLabel className="text-white">Product Image</FormLabel>
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-6 hover:bg-slate-800/50 transition-colors">
                                    {imagePreview ? (
                                        <div className="relative w-full aspect-square mb-4">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2 h-8 w-8"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    form.setValue('imageUrl', '');
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-2">
                                            <div className="flex justify-center">
                                                <Upload className="h-10 w-10 text-slate-500" />
                                            </div>
                                            <div className="text-sm text-slate-400">
                                                <label htmlFor="image-upload" className="cursor-pointer text-blue-400 hover:text-blue-300">
                                                    Click to upload
                                                </label>
                                                <p>or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                                        </div>
                                    )}
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {/* Hidden input for the actual URL string */}
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <Input type="hidden" {...field} />
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
