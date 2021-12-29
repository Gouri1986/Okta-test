import Chart from "react-apexcharts";
// Chart Imports
import { Card, CardHeader, CardContent } from "@mui/material";

const ApexRadiarChart = () => {
  const donutColors = {
    series1: "#6418C3",
    series2: "#FFAB2D",
    series3: "#E328AF",
    series4: "#E328AF",
    series5: "#5ECFFF",
  };
  const options = {
    legend: {
      show: true,
      position: "bottom",
    },
    labels: ["Network", "Compute", "IAM", "CLoud"],

    colors: [
      donutColors.series1,
      donutColors.series5,
      donutColors.series3,
      donutColors.series2,
    ],
    dataLabels: {
      enabled: true,
      formatter(val, opt) {
        // return `${parseInt(val)}%`
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
            name: {
              fontSize: "2rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1rem",
              fontFamily: "Montserrat",
              formatter(val) {
                // return `${parseInt(val)}%`
              },
            },
            total: {
              show: false,
              fontSize: "1.5rem",
              label: "Operational",
              formatter(w) {
                return "31%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "1.5rem",
                  },
                  value: {
                    fontSize: "1rem",
                  },
                  total: {
                    fontSize: "1.5rem",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  const series = [85, 16, 50, 50];

  return (
    <Card style={{ height: "100%" }}>
      <CardHeader></CardHeader>
      <CardContent>
        <Chart options={options} series={series} type="donut" height={180} />
      </CardContent>
    </Card>
  );
};

export default ApexRadiarChart;
