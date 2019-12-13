
import React from 'react';

let equal;

// series line colours
const ratingColor = '#F28500';
const weatherColor = '#50C878';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    // chart settings and some temp sample data
    this.state = {
      options: {
        chart: {
          type: 'line',
        },
        colors: [ratingColor, weatherColor],
        xaxis: {
          categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yaxis: [
          {
            title: {
              text: "Arthritis"
            },
          },
          {
            opposite: true,
            title: {
              text: "Weather"
            }
          }
        ],
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

  componentDidUpdate(prevProps) {

    // set new chart options in state (rerender entire chart)
    //  upon change of date range (x-axis categories)

    if(!equal(this.props.startDate, prevProps.startDate) ||
      !equal(this.props.endDate, prevProps.endDate))
    {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            // todo
            categories: ['a','b','c','d','e','f','g','h','i','j']
          },
        }
      });
    }
  }

  render() {

    // importing ApexCharts breaks ssr so only import on csr
    if (!process.browser) {
      return null
    }
    const Chart = require('react-apexcharts').default
    equal = require('fast-deep-equal/es6/react');

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.props.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
