import Chart from 'react-apexcharts'

// Chart Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


const ApexColumnCharts = ({ direction }) => {
  const columnColors = {
    series1: '#E328AF',
    series2: '#5ECFFF',
    bg: '#FFFFFF'
  }

  const options = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        colors: {
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
          backgroundBarRadius: 10
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start'
    },
    colors: [columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ['transparent']
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12']
    },
    fill: {
      opacity: 1
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  const series = [
    {
      name: 'Passed',
      data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180]
    },
    {
      name: 'Failed',
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20]
    }
  ]

  return (
    <Card>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
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
        <Chart options={options} series={series} type='bar' height={168} />
      </CardContent>
    </Card>
  )
}

export default ApexColumnCharts
