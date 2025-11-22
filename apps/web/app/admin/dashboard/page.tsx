'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { SalesChart } from '@/components/admin/SalesChart';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

interface Analytics {
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
    activeProducts: number;
    pendingOrders: number;
    recentOrders: any[];
}

export default function AdminDashboardPage() {
    const { token } = useAdminAuth();
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, [token]);

    const fetchAnalytics = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/analytics/overview`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const stats = [
        {
            title: 'Total Revenue',
            value: `₹${analytics?.totalRevenue.toLocaleString('en-IN') || 0}`,
            icon: DollarSign,
            trend: '+12.5%',
            trendUp: true,
        },
        {
            title: 'Total Orders',
            value: analytics?.totalOrders || 0,
            icon: ShoppingCart,
            trend: '+8.2%',
            trendUp: true,
        },
        {
            title: 'Active Products',
            value: `${analytics?.activeProducts || 0}/${analytics?.totalProducts || 0}`,
            icon: Package,
            trend: '+3',
            trendUp: true,
        },
        {
            title: 'Pending Orders',
            value: analytics?.pendingOrders || 0,
            icon: TrendingUp,
            trend: '-2',
            trendUp: false,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid gap-6 md:grid-cols-2">
                <SalesChart />
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                            <div>
                                <p className="text-sm text-slate-400">Average Order Value</p>
                                <p className="text-2xl font-bold text-white">
                                    ₹{analytics?.totalOrders ? (analytics.totalRevenue / analytics.totalOrders).toFixed(2) : 0}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-blue-400" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                            <div>
                                <p className="text-sm text-slate-400">Conversion Rate</p>
                                <p className="text-2xl font-bold text-white">3.2%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <RecentOrders orders={analytics?.recentOrders || []} />
        </div>
    );
}
