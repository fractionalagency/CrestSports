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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Order {
    id: string;
    trackingId: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    items: any[];
}

export default function OrdersPage() {
    const { token } = useAdminAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, page, search, statusFilter]);

    const fetchOrders = async () => {
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

            if (statusFilter !== 'ALL') {
                queryParams.append('status', statusFilter);
            }

            const response = await fetch(`${apiUrl}/api/v1/admin/orders?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data.orders);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
            <div>
                <h1 className="text-3xl font-bold text-white">Orders</h1>
                <p className="text-slate-400 mt-2">Manage customer orders</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search orders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px] bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="ALL">All Statuses</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-slate-800/50">
                            <TableHead className="text-slate-400">Order ID</TableHead>
                            <TableHead className="text-slate-400">Customer</TableHead>
                            <TableHead className="text-slate-400">Date</TableHead>
                            <TableHead className="text-slate-400">Total</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-slate-400">Payment</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-slate-400">
                                    Loading orders...
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-slate-400">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-mono text-slate-300">{order.trackingId}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">{order.customerName}</span>
                                            <span className="text-xs text-slate-500">{order.customerEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-300">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-slate-300">₹{order.total.toLocaleString('en-IN')}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-slate-700 text-slate-300">
                                            {order.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => router.push(`/admin/orders/${order.id}`)}
                                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
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
