import React, {useEffect} from 'react';
import Page from '~/components/Page';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

  <Grid container justify="center" spacing={2}>

    <Box m={2}>

    <Grid container justify="center" alignItems="center">
      <div><Typography variant="h5"> Pain Rating vs. </Typography></div>
      <Select/>
    </Grid>

    <Grid container justify="center" spacing={10}>
      <Grid item >
        <DatePicker label="Start Date"/>
      </Grid>
      <Grid item>
        <DatePicker label="End Date"/>
      </Grid>
    </Grid>

    </Box>

    <Grid item xs={8}>
    <Paper elevation={2} variant="outlined">
    <Box m={1}>
      <div id='chart'/>
    </Box>
    </Paper>
    </Grid>

  </Grid>

  <Fab size="large" color="secondary" aria-label="add">
    <AddIcon />
  </Fab>

  </Page>
)};

export default App