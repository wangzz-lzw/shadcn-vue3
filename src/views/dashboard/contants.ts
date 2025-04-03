import { EChartsOption } from "echarts";

export const pieChartOptions = (dataMap:any): EChartsOption => (
    {
        title: {
            text: '读者互动情况',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            bottom: '10%',
            left: 'center',
        },
        series: [
            {
                name: '互动类型',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '评论' },
                    { value: 735, name: '点赞' },
                    { value: 580, name: '分享' },
                    { value: 484, name: '收藏' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }
);

export const articleChartOptions = (dataMap:any): EChartsOption => (
    {
        title: {
            text: '文章阅读趋势',
            left: 'center',
        },
        xAxis: {
            type: 'category',
            data: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [ 120, 200, 150, 80, 70, 110, 130 ],
                type: 'line',
                smooth: true,
            },
        ],
    }
);