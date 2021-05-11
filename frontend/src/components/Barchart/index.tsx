import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { round } from "types/format";
import { SaleSuccess } from "types/sale";
import { BASE_URL } from "utils/requests";

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {
    const [chartData, setChartData] = useState<ChartData>({ labels: { categories: [] }, series: [] });

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`).then((res) => {
            const datas = res.data as SaleSuccess[];
            const tLabels = datas.map((data) => (data.sellerName))
            const tSeries = datas.map((data) => (round(100.0 * data.deals / data.visited, 1)));

            setChartData({
                labels: {
                    categories: tLabels
                },
                series: [
                    {
                        name: "% Success",
                        data: tSeries
                    }
                ]
            });
        })
    }, []);

    return (
        <Chart options={{ ...options, xaxis: chartData.labels }} series={chartData.series} type="bar" height="240" />
    )
}

export default BarChart;

