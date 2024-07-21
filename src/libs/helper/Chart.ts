import ApexCharts from "apexcharts";
import { formatRupiah } from ".";

// Tipe data untuk objek di dalam series data
interface SeriesData {
  x: string;
  y: number;
  name: string;
}

// Fungsi utama untuk membuat chart
const chart = (monthlyData: number[]): any => {
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Membuat series data dengan nama bulan dan format rupiah
  const seriesData: SeriesData[] = monthlyData.map((value, index) => ({
    x: months[index],
    y: value,
    name: `${months[index]}: ${formatRupiah(value)}`
  }));

  const chartFourOptions: ApexCharts.ApexOptions = {
    series: [
      {
        name: "Visitors Analytics",
        data: seriesData,
      },
    ],
    colors: ["#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: Array(months.length).fill("#FFFFFF"), // Set all x-axis labels to white
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return formatRupiah(val);
        },
        style: {
          colors: ["#FFFFFF"], // Set y-axis labels to white
        },
      },
      title: {
        text: "",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      custom: function ({ dataPointIndex }: { series: number[][]; seriesIndex: number; dataPointIndex: number; w: any }) {
        const data = seriesData[dataPointIndex];
        return `<div class="arrow_box">
                  <span>${data.name}</span>
                </div>`;
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartTransaction");

  if (chartSelector.length) {
    const chartTransaction = new ApexCharts(
      document.querySelector("#chartTransaction"),
      chartFourOptions
    );
    chartTransaction.render();
  }
};

export default chart;
