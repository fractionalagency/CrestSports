'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Truck, Package, User, CreditCard, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { token } = useAdminAuth();
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (token && params.id) {
            fetchOrder();
        }
    }, [token, params.id]);

    const fetchOrder = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/orders/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrder(data);
                setTrackingNumber(data.trackingNumber || '');
                setNotes(data.notes || '');
            }
        } catch (error) {
            console.error('Failed to fetch order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/orders/${params.id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: newStatus,
                    notes: `Status updated to ${newStatus}`,
                }),
            });

            if (response.ok) {
                fetchOrder();
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleTrackingUpdate = async () => {
        setIsUpdating(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/orders/${params.id}/tracking`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    trackingNumber,
                    notes,
                }),
            });

            if (response.ok) {
                fetchOrder();
            }
        } catch (error) {
            console.error('Failed to update tracking:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-white">Order not found</h2>
                <p className="text-slate-400">The order you are looking for does not exist.</p>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-500';
            case 'PAID': return 'bg-blue-500/10 text-blue-500';
            case 'PROCESSING': return 'bg-purple-500/10 text-purple-500';
            case 'SHIPPED': return 'bg-indigo-500/10 text-indigo-500';
            case 'DELIVERED': return 'bg-green-500/10 text-green-500';
            case 'CANCELLED': return 'bg-red-500/10 text-red-500';
            case 'REFUNDED': return 'bg-orange-500/10 text-orange-500';
            default: return 'bg-slate-500/10 text-slate-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Order #{order.trackingId}
                        <Badge className={getStatusColor(order.status)}>
                            {order.status}
                        </Badge>
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-400" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50">
                                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-slate-800">
                                            {item.product.imageUrl && (
                                                <Image
                                                    src={item.product.imageUrl}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-white">{item.name}</h4>
                                            <p className="text-sm text-slate-400">SKU: {item.sku}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-white">₹{item.price.toLocaleString('en-IN')}</p>
                                            <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-white w-24 text-right">
                                            ₹{item.total.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                                <Separator className="bg-slate-800" />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Subtotal</span>
                                        <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Shipping</span>
                                        <span>₹{order.shippingCost.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Tax</span>
                                        <span>₹{order.tax.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold text-lg pt-2">
                                        <span>Total</span>
                                        <span>₹{order.total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Truck className="h-5 w-5 text-blue-400" />
                                Fulfillment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Update Status</label>
                                    <Select
                                        disabled={isUpdating}
                                        value={order.status}
                                        onValueChange={handleStatusUpdate}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="PAID">Paid</SelectItem>
                                            <SelectItem value="PROCESSING">Processing</SelectItem>
                                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                            <SelectItem value="REFUNDED">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Tracking Number</label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            placeholder="Enter tracking number"
                                            className="bg-slate-800 border-slate-700 text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Order Notes</label>
                                <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add internal notes about this order..."
                                    className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleTrackingUpdate}
                                    disabled={isUpdating}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-400" />
                                Customer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-400">Name</p>
                                <p className="font-medium text-white">{order.customerName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Email</p>
                                <p className="font-medium text-white">{order.customerEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Phone</p>
                                <p className="font-medium text-white">{order.customerPhone}</p>
                            </div>
                            <Separator className="bg-slate-800" />
                            <div>
                                <p className="text-sm text-slate-400 mb-1">Shipping Address</p>
                                <div className="text-white text-sm leading-relaxed">
                                    {order.shippingAddress && (
                                        <>
                                            <p>{order.shippingAddress.street}</p>
                                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                            <p>{order.shippingAddress.country}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-blue-400" />
                                Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Status</span>
                                <Badge variant="outline" className="border-slate-700 text-slate-300">
                                    {order.paymentStatus}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Method</span>
                                <span className="text-white">{order.paymentMethod || 'N/A'}</span>
                            </div>
                            {order.paymentId && (
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Transaction ID</span>
                                    <span className="text-white font-mono text-xs">{order.paymentId}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-400" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 relative pl-4 border-l border-slate-800">
                                {order.statusHistory?.map((history: any, index: number) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-900" />
                                        <p className="text-sm font-medium text-white">{history.status}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(history.timestamp).toLocaleString()}
                                        </p>
                                        {history.notes && (
                                            <p className="text-xs text-slate-400 mt-1">{history.notes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
