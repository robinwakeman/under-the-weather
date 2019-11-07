import React, {useEffect} from 'react';
import Page from '~/components/Page';

// importing ApexCharts breaks ssr so only import on csr
let ApexCharts;
if(process.browser) {ApexCharts = require ('apexcharts').default};

const App = () => {

  useEffect(() => {
    if(process.browser) {

      const options = {
        chart: {
          type: 'line'
        },
        markers: {
          size: 6,
        },
        series: [{
          name: 'sales',
          data: [30,40,35,50,49,60,70,91,125]
        },
        {
          name: 'something',
          data: [33,45,25,30,41,30,60,81,105]
        }],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
      }
      const chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    }
  }, []);

  return (
  <Page>
    <div id='chart'>
    </div>
  </Page>
)};

export default App