'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

interface OrderItem {
    product: {
        name: string;
        imageUrl: string | null;
    };
}

interface Order {
    id: string;
    trackingId: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

interface RecentOrdersProps {
    orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
            case 'PAID':
                return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case 'PROCESSING':
                return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
            case 'SHIPPED':
                return 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20';
            case 'DELIVERED':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'CANCELLED':
                return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            case 'REFUNDED':
                return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20';
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                    <Link href="/admin/orders">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <p className="text-center text-slate-500 py-4">No recent orders found.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10 border border-slate-700">
                                        <AvatarImage src={order.items[0]?.product.imageUrl || ''} alt="Product" />
                                        <AvatarFallback className="bg-slate-800 text-slate-400">
                                            {order.customerName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-white leading-none">
                                            {order.customerName}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {order.items.length} item{order.items.length !== 1 && 's'} • {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-medium text-white">
                                        ₹{order.total.toLocaleString('en-IN')}
                                    </p>
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
