'use client';

import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Lock, Globe, Mail } from 'lucide-react';

export default function SettingsPage() {
    const { admin } = useAdminAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-2">Manage your account and store preferences</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-slate-900 border-slate-800 md:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-white">Security</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">
                            Manage your password and security preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-white">Current Password</Label>
                                <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-white">New Password</Label>
                                <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white">Confirm Password</Label>
                                <Input type="password" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Update Password
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-white">Notifications</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">
                            Configure how you receive alerts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-white">Order Alerts</Label>
                                <p className="text-sm text-slate-400">Get notified when a new order is placed</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator className="bg-slate-800" />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-white">Low Stock Warnings</Label>
                                <p className="text-sm text-slate-400">Alert when products are running low</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator className="bg-slate-800" />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-white">Daily Summary</Label>
                                <p className="text-sm text-slate-400">Receive a daily sales report via email</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-white">Store Preferences</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">
                            General store settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-white">Store Name</Label>
                            <Input defaultValue="CrestSports" className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white">Support Email</Label>
                            <Input defaultValue="support@crestsports.com" className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white">Currency</Label>
                            <Select defaultValue="INR">
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                    <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
