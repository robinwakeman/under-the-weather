import React, { useEffect, useState } from 'react';

// importing ApexCharts breaks ssr so only import on csr
let ApexCharts;
if(process.browser) {ApexCharts = require ('apexcharts').default};

export default function Chart(props) {

  // chart
  useEffect(() => {
    if(process.browser) {

      let ratingColor = '#70a987';
      let weatherColor = '#b35d74';

      let options = {
        chart: {
          type: 'line',
        },
        colors: [ratingColor, weatherColor],
        series: [{
          name: 'Arthritis Severity Rating',
          data: [30,40,35,50,49,60,70,91,125]
        },
        {
          name: '[Weather]',
          data: [33,45,25,30,41,30,60,81,105]
        }],
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

      }
      const chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    }
  }, []);

  return (
    <div id='chart'/>
  );
};