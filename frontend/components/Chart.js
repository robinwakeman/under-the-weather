
import React from 'react';

let equal;

// series line colours
const ratingColor = '#00E396';
const weatherColor = '#008FFB';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    // chart settings and some temp sample data
    // todo: x-axis type: datetime, use formatter/datetimeFormatter field
    this.state = {
      options: {
        chart: {
          type: 'line',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        colors: [ratingColor, weatherColor],
        xaxis: {
          type: 'datetime',
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
          },
          tickAmount: undefined,
          tickPlacement: 'on',
          min: undefined,
          max: undefined,
          range: undefined,
          floating: false,
        },
        yaxis: [
          {
            title: {
              text: "Arthritis",
              style: {
                color: undefined,
                fontSize: '15px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-yaxis-title',
              },
            },
            tickAmount: 10,
            forceNiceScale: false,
            decimalsInFloat: 0,
            labels: {
              show: true,
              minWidth: 0,
              maxWidth: 160,
              style: {
                  color: undefined,
                  fontSize: '14px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  cssClass: 'apexcharts-yaxis-label',
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
            },
          },
          {
            opposite: true,
            title: {
              text: "Weather",
              style: {
                color: undefined,
                fontSize: '15px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-yaxis-title',
              },
            },
            decimalsInFloat: 1,
            labels: {
              show: true,
              minWidth: 0,
              maxWidth: 160,
              style: {
                  color: undefined,
                  fontSize: '14px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  cssClass: 'apexcharts-yaxis-label',
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
            },
          }
        ],
        markers: {
          size: 0,
        },
        stroke: {
            show: true,
            curve: 'straight',
            lineCap: 'round',
            width: 2,
            dashArray: [0, 4],
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
