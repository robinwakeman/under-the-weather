
import React from 'react';

// series line colours
const ratingColor = '#F28500';
const weatherColor = '#50C878';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    // options are the chart settings, only need to be set once
    this.state = {
      options: {
        chart: {
          type: 'line',
        },
        colors: [ratingColor, weatherColor],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        },
        markers: {
          size: 6,
        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'round',
            width: 2,
            dashArray: [8, 8],
        },
        legend: {
          showForSingleSeries: true,
          position: 'bottom',
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial',
          labels: {
            useSeriesColors: false
          },
          markers: {
            width: 12,
            height: 12,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 10
          },
        },
        tooltip: {
          fillSeriesColor: false,
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
          },
          marker: {
            show: true,
          },
        },
      },
    };
  }

  render() {

    // importing ApexCharts breaks ssr so only import on csr
    if (!process.browser) {
      return null
    }
    const Chart = require('react-apexcharts').default

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.props.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
