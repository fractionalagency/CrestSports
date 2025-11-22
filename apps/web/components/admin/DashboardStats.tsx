'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stat {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend: string;
    trendUp: boolean;
}

interface DashboardStatsProps {
    stats: Stat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p
                                    className={cn(
                                        'text-xs font-medium flex items-center gap-1',
                                        stat.trendUp ? 'text-green-400' : 'text-red-400'
                                    )}
                                >
                                    <span>{stat.trendUp ? '↑' : '↓'}</span>
                                    {stat.trend} from last month
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                                <stat.icon className="h-6 w-6 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
