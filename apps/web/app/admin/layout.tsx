'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { admin, isLoading } = useAdminAuth();

    useEffect(() => {
        if (!isLoading && !admin && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [admin, isLoading, pathname, router]);

    // Show login page without layout
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />
            <div className="lg:pl-64">
                <AdminHeader />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminAuthProvider>
    );
}
