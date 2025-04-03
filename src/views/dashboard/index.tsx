import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getBlogStats } from "@/service/dashboard";
import { pieChartOptions, articleChartOptions } from './contants';
// 导入ECharts
import * as echarts from 'echarts';
import { useUiConfig } from "./uiconfig";

export default function DashboardPage() {
    const [ stats, setStats ] = useState({
        totalPosts: 0,
        totalViews: 0,
        totalComments: 0,
        totalLikes: 0
    });

    const uiConfig = useUiConfig();

    useEffect(() => {
        // 从接口获取数据
        init();

        // 初始化ECharts实例
        const articleTrendChart = echarts.init(document.getElementById('article-trend-chart'));
        const readerInteractionChart = echarts.init(document.getElementById('reader-interaction-chart'));
        const dataMap = {};

        // 设置文章阅读趋势图表配置
        uiConfig.setcharts(articleTrendChart, articleChartOptions, dataMap);

        // 设置读者互动情况图表配置
        uiConfig.setcharts(readerInteractionChart, pieChartOptions, dataMap);

        // 组件卸载时销毁ECharts实例
        return () => {
            articleTrendChart.dispose();
            readerInteractionChart.dispose();
        };
    }, []);

    const init = async () => {
        const { data } = await getBlogStats();
        setStats(data);
    };

    return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center relative">
            <div className="relative z-10 w-full max-w-6xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20 animate-fade-in">
                {/* 标题 */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">博客数据统计</h1>
                    <p className="text-gray-500 mt-2">实时了解您的博客运营情况</p>
                </div>

                {/* 数据概览卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">总文章数</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalPosts}</div>
                            <p className="text-xs text-gray-500">持续创作中</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">总浏览量</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalViews}</div>
                            <p className="text-xs text-gray-500">不断增长中</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">总评论数</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalComments}</div>
                            <p className="text-xs text-gray-500">与读者互动</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">总点赞数</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalLikes}</div>
                            <p className="text-xs text-gray-500">读者认可</p>
                        </CardContent>
                    </Card>
                </div>

                {/* 图表区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>文章阅读趋势</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div id="article-trend-chart" className="h-64" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>读者互动情况</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div id="reader-interaction-chart" className="h-64" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}