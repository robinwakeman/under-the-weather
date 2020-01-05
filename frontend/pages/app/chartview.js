import React, { useState, useEffect  } from 'react';
import { useGlobal } from 'reactn';
import Page from '~/components/Page';
import Chart from '~/components/Chart';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';
import EntryDialog from '~/components/EntryDialog';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


// temporary stub -- todo remove
const defaultLocationStub = 'Ottawa';

const ChartView = () => {
  // auth
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  // EntryDialog input controls
  const [ rating, setRating ] = useState(0);
  const [ datetime, setDatetime ] = useState(new Date()); // format: 2014-08-18T21:11:54
  const [ location, setLocation ] = useState(defaultLocationStub);
  const [ notes, setNotes ] = useState('');
  // EntryDialog open/close control
  const [dialogOpen, setDialogOpen] = useState(false);
  // set selected weather metric series to display on the chart
  const [weatherMetric, setWeatherMetric] = useState('');
  // set selected date range for chart x-axis
  const [startDate, setStartDate] = useState(''); // 1 month ago?
  const [endDate, setEndDate] = useState(''); //today?

  // temp sample weather data
  let sampleWeather = {
    "Precipitation": [6,3,0,0,0,1,2,0,4,5,6,3,0,0,0,1,2,0,4,5],
    "Humidity": [40,31,36,45,57,52,50,44,50,41,40,31,36,45,57,52,50,44,50,41],
    "Temperature": [20,22,26,19,27,32,24,17,23,20,20,22,26,19,27,32,24,17,23,20],
  }
  // temp sample data
  let chartSeries = [
      {
        name: 'Arthritis Severity Rating',
        data: [2,1,0,3,5,6,4,8,6,10,2,1,0,3,5,6,4,8,6,10]
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
          <DatePicker label="Start Date"/>
        </Grid>
        <Grid item>
          <DatePicker label="End Date"/>
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
