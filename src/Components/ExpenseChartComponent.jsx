import { Card } from "@mui/material";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
const ExpenseChartComponent = ({ filteredRows }) => {
  const data = useMemo(() => {
    const dataObj = {};
    filteredRows.forEach((row) => {
      dataObj[row.category] = dataObj[row.category]
        ? parseInt(dataObj[row.category]) + parseInt(row.amount)
        : parseInt(row.amount);
    });
    const arr = [[], []];
    if (Object.entries(dataObj).length === 0) return arr;
    for (let key in dataObj) {
      arr[0].push(key);
      arr[1].push(dataObj[key]);
    }
    return arr;
  }, [filteredRows]);
  const pieChart = {
    series: data[1],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: data[0],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const barChart = {
    series: [
      {
        name: "Expense",
        data: data[1],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: data[0].map((dataPoint) => [dataPoint]),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <Card sx={{ margin: 5 }}>
        <ReactApexChart
          options={pieChart.options}
          series={pieChart.series}
          type="pie"
          width={380}
        />
      </Card>
      <Card sx={{ margin: 5 }}>
        <ReactApexChart
          options={barChart.options}
          series={barChart.series}
          type="bar"
          height={300}
        />
      </Card>
    </div>
  );
};
export default ExpenseChartComponent;
