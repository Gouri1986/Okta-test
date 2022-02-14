import Chart from 'react-apexcharts';

// Chart Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';

const ApexColumnCharts = ({ direction }) => {
  const columnColors = {
    series1: '#E80054',
    series2: '#003ECB',
    series3: '#FFC300',
    series4: '#667222',
    bg: '#f2f2f2',
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
        columnWidth: '20%',
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
      enabled: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start',
    },
    colors: [columnColors.series1, columnColors.series2, columnColors.series3],
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
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
      ],
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
      name: 'CTG1',
      data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180],
    },
    {
      name: 'CTG2',
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
    },
    {
      name: 'CTG3',
      data: [70, 20, 20, 30, 85, 80, 10, 100, 52, 10],
    },
    {
      name: 'CTG4',
      data: [60, 20, 20, 30, 85, 80, 10, 100, 52, 10],
    },
  ];

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
          height={245}
          style={{ backgroundColor: '#f2f2f2' }}
        />
      </CardContent>
    </Card>
  );
};

export default ApexColumnCharts;
