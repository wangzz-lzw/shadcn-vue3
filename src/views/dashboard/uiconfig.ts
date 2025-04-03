import { ECharts, EChartsOption } from "echarts";

export const useUiConfig = () => {
    const setcharts = (target:ECharts, setOptions:(dataMap:any)=>EChartsOption, dataMap:any) => {
        target.setOption(setOptions(dataMap));
    };
    return {
        setcharts
    };
};