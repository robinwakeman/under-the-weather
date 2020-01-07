import React, { useState, useEffect  } from 'react';
import { useGlobal } from 'reactn';
import Page from '~/components/Page';
import Chart from '~/components/Chart';
import Select from '~/components/Select';
import EntryDialog from '~/components/EntryDialog';
import 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


// temporary stub -- todo remove
const defaultLocationStub = 'Ottawa';

const getDateOneMonthAgo = (date) => {
  return date.setMonth(date.getMonth() - 1);
}

const ChartView = () => {
  // auth
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  // user entries (for chart data: both painSeries and weatherSeries)
  const [ entries, setEntries ] = useState([]);
  // KeyboardDatePicker controls (for chart x-axis)
  const [ startDate, setStartDate ] = useState(getDateOneMonthAgo(new Date()));
  const [ endDate, setEndDate ] = useState(new Date());
  // EntryDialog input controls
  const [ rating, setRating ] = useState(0);
  const [ datetime, setDatetime ] = useState(new Date()); // format: 2014-08-18T21:11:54
  const [ location, setLocation ] = useState(defaultLocationStub);
  const [ notes, setNotes ] = useState('');
  // EntryDialog open/close control
  const [dialogOpen, setDialogOpen] = useState(false);
  // set selected weather metric series to display on the chart
  const [weatherMetric, setWeatherMetric] = useState('');

  useEffect(() => {
    // get all entries on ChartView render

    fetch('http://localhost:3001/entries', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(responseEntries => {

        setEntries(responseEntries);

      }); // end of fetch chain
    },
  []); // end of useEffect

  // temp sample weather data
  let sampleWeather = {
    "Precipitation": [ {
          x: new Date('2020-01-01').getTime(),
          y: Math.floor((Math.random() * 20) + 1)
        },
        {
          x: new Date('2020-01-02').getTime(),
          y: Math.floor((Math.random() * 20) + 1)
        },
        {
          x: new Date('2020-01-03').getTime(),
          y: Math.floor((Math.random() * 20) + 1)
        },
        {
          x: new Date('2020-01-04').getTime(),
          y: Math.floor((Math.random() * 20) + 1)
        } ],
    "Humidity": [ {
          x: new Date('2020-01-01').getTime(),
          y: Math.floor((Math.random() * 100) + 1)
        },
        {
          x: new Date('2020-01-02').getTime(),
          y: Math.floor((Math.random() * 100) + 1)
        },
        {
          x: new Date('2020-01-03').getTime(),
          y: Math.floor((Math.random() * 100) + 1)
        },
        {
          x: new Date('2020-01-04').getTime(),
          y: Math.floor((Math.random() * 100) + 1)
        } ],
  }


  let painSeriesData = entries.map(entry => {
      return { x: entry.datetime, y: entry.rating, };
    });

  // let weatherSeriesData = user.entries.map(entry => {
  //     return { x: entry.datetime, y: entry.weather[weatherMetric], };
  //   });


  let chartSeries = [
      {
        name: 'Arthritis Severity Rating',
        data: painSeriesData,
      },
      // {
      //   name: weatherMetric,
      //   data: weatherSeriesData,
      // }
    ];

  // temp sample data
  let testChartSeries = [
      {
        name: 'Arthritis Severity Rating',
        data: [ {
          x: new Date('2020-01-01').getTime(),
          y: 3
        },
        {
          x: new Date('2020-01-02').getTime(),
          y: 10
        },
        {
          x: new Date('2020-01-03').getTime(),
          y: 6
        },
        {
          x: new Date('2020-01-04').getTime(),
          y: 7
        } ]
      },
      {
        name: weatherMetric,
        data: sampleWeather[weatherMetric],
      }
    ];

  const clearDialogInputs = () => {
    setRating(0);
    setDatetime(new Date());
    setLocation(defaultLocationStub);
    setNotes('');
  }

  // on click of '+' floating action button
  const addNewEntry = () => {

    const newEntry = {
      rating: rating,
      datetime: datetime,
      location: location,
      notes: notes,
      // weather: {}
    };

    fetch('http://localhost:3001/entries', { // todo change URL to env variable
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry),
    })
    .then((response) => {
      return response.json();
    })
    .then(responseEntries => {
      setDialogOpen(false);
      clearDialogInputs();
    });

  }

  return (
  <Page
    appBarButtonLabel="List View"
    appBarButtonLink="/app/listview"
    >

    <Grid container justify="center" spacing={2}>

      <Box m={2}>

      <Grid container justify="center" alignItems="center">
        <div>
          <Typography variant="h5"> Arthritis Severity vs. </Typography>
        </div>
        <Select
          onChange={(value)=>{
            setWeatherMetric(value);
          }}
          />
      </Grid>

      <Grid container justify="center" spacing={10}>

        <Grid item >
          <KeyboardDatePicker
            label="Start Date"
            format="dd/MM/yyyy"
            defaultValue={startDate}
            value={startDate}
            onChange={date => {
              setStartDate(date);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change start date for chart',
            }}
            />
        </Grid>

        <Grid item>
          <KeyboardDatePicker
            label="End Date"
            format="dd/MM/yyyy"
            defaultValue={endDate}
            value={endDate}
            onChange={date => {
                setEndDate(date);
              }}
            KeyboardButtonProps={{
              'aria-label': 'change end date for chart',
            }}
            />
        </Grid>

      </Grid>

      </Box>

      <Grid item xs={8}>
        <Paper elevation={2}>

          <Box pt={2} px={3}>
            <Chart
              series={chartSeries}
              startDate={startDate}
              endDate={endDate}
              />
          </Box>

        </Paper>
      </Grid>

    </Grid>

    <Fab
      size="large"
      color="secondary"
      aria-label="add"
      onClick={()=>{
        setDialogOpen(true);
      }}
      >
      <AddIcon />
    </Fab>

    <EntryDialog
      dialogTitle="How would you rate your arthritis today?"
      open={dialogOpen}
      onSave={addNewEntry}
      onCancel={() => {setDialogOpen(false);}}
      ratingValue={rating}
      ratingOnChange={(event, value) => setRating(value) }
      datetimeValue={datetime}
      datetimeOnChange={date => setDatetime(date)}
      locationValue={location}
      locationOnChange={event => { setLocation(event.target.value); }}
      notesValue={notes}
      notesOnChange={event => { setNotes(event.target.value); }}
      />

  </Page>
)};

export default ChartView
