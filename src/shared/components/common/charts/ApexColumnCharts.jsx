import Chart from 'react-apexcharts';

// Chart Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ApexColumnCharts = ({ direction }) => {
  const { user: token } = useSelector((state) => state.userReducer);
  const [chartData, setChartData] = useState([]);

  const getChartValues = async () => {
    const response = await axios.get(
      `http://172.16.1.240:30596/api/v1/recs-oci-customer-resource-count-details`,
      {
        headers: {
          'access-token': token,
        },
      }
    );
    setChartData(response.data.data.slice(0, 20));
  };

  useEffect(() => {
    getChartValues();
  }, []);

  const columnColors = {
    series1: '#E80054',
    series2: '#003ECB',
    series3: '#FFC300',
    series4: '#667222',
    series5: '#bb2e45',
    // bg: '#f2f2f2',
  };

  const options = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        colors: {
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
          ],
          backgroundBarRadius: 10,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start',
    },
    colors: [columnColors.series5],
    stroke: {
      show: true,
      colors: ['transparent'],
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: chartData.map((datum) => datum.ociResourceType),
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      opposite: direction === 'rtl',
    },
  };

  const series = [
    {
      name: 'Count',
      data: chartData.map((datum) => datum.ociResourceCount),
    },
  ];

  console.log(series);

  return (
    <Card>
      <CardHeader className='flex-c-ac-jc p-0 ff-poppins'>
        {/* <CardTitle tag='h4'>Networking Compliance</CardTitle>
        <div className='d-flex align-items-center mt-md-0 mt-1'>
          <Calendar size={17} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2021-11-01', '2021-11-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          />
        </div> */}
      </CardHeader>
      <CardContent>
        <Chart
          options={options}
          series={series}
          type='bar'
          height={270}
          style={{ backgroundColor: '#f2f2f2' }}
        />
      </CardContent>
    </Card>
  );
};

export default ApexColumnCharts;
