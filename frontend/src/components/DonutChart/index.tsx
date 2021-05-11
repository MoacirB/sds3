import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`).then((res) => {
            const datas = res.data as SaleSum[];
            const tLabels = datas.map( (data)=>(data.name));
            const tSeries = datas.map( (data)=>(data.sum));

            setChartData({labels:tLabels, series:tSeries});
        });
    }, []);


    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart options={{ ...options, labels: chartData.labels }} series={chartData.series} type="donut" height="240" />
    )
}

export default DonutChart;