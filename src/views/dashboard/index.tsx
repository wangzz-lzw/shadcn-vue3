import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, PieChart, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center relative">
            <div className="relative z-10 w-full max-w-6xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20 animate-fade-in">
                {/* 标题 */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
                    <p className="text-gray-500 mt-2">查看您的关键指标和统计数据</p>
                </div>

                {/* 数据概览卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">总收入</CardTitle>
                            <DollarSign className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-gray-500">比上周增长 20.1%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">用户总数</CardTitle>
                            <Users className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,456</div>
                            <p className="text-xs text-gray-500">比上周增长 5.3%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">订单总数</CardTitle>
                            <BarChart className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8,923</div>
                            <p className="text-xs text-gray-500">比上周增长 12.7%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">转化率</CardTitle>
                            <PieChart className="w-4 h-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45.6%</div>
                            <p className="text-xs text-gray-500">比上周增长 3.2%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* 图表区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>收入趋势</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* 模拟图表 */}
                            <div className="h-64 bg-gray-100 rounded-lg" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>用户分布</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* 模拟图表 */}
                            <div className="h-64 bg-gray-100 rounded-lg" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}