'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-slate-400 mt-2">This is the admin dashboard.</p>
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Welcome to Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-300">
                        This is a blank admin dashboard page. You have successfully logged in to the admin portal.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
