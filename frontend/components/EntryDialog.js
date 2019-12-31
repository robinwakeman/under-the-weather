import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from '~/components/Slider';
import DatePicker from '~/components/DatePicker';
import TimePicker from '~/components/TimePicker';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ResponsiveDialog(props) {

  // temporary sample data
  let defaultUserLocation = 'Ottawa';

  // auth
  const [ authToken, setAuthToken ] = useGlobal('authToken');

  // collect values from all inputs
  const [ rating, setRating ] = useState(0);
  const [ datetime, setDatetime ] = useState(new Date()); // format: 2014-08-18T21:11:54
  const [ location, setLocation ] = useState(defaultUserLocation);
  const [ notes, setNotes ] = useState('');

  // set a breakpoint at sm = 600px width
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const saveEntry = () => {

    const entry = {
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
      body: JSON.stringify(entry),
    })
    .then((response) => {
      return response.json();
    })
    .then(responseEntries => {
      // refresh list component to display new data
      props.onSave(responseEntries);
      // clear dialog fields
      setRating(0);
      setDatetime(new Date());
      setLocation(defaultUserLocation);
      setNotes('');
    });

  };

  const onSaveClick = () => {
    // todo call get-weather-data function here
    saveEntry();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onClose}
        scroll="body"
        aria-labelledby="responsive-dialog-title"
      >
      <Box m={4}>

        <DialogTitle id="responsive-dialog-title">
          {props.dialogTitle}
        </DialogTitle>

        <DialogContent>
        <Grid container direction="column" spacing={4}>

          <Grid item>
            <DialogContentText>
            Rate your arthritis pain on a scale of 0 to 10:
            </DialogContentText>
          </Grid>

          <Grid item>
            <Slider
              defaultValue={rating}
              value={rating}
              onChange={(event, value) => setRating(value) }
              />
            <Grid container justify="space-between">
              <Grid item>
                <span style={{color: "#07ab84"}}><b>None</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#FEB019"}}><b>Mild</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#F86624"}}><b>Moderate</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#EA3546"}}><b>Severe</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#820057"}}><b>Worst</b></span>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>

            <Grid item xs={6}>
              <Grid container direction="column">
                <DatePicker
                  label="Date"
                  value={datetime}
                  onChange={date => setDatetime(date)}
                  />
                <TimePicker
                  label="Time"
                  value={datetime}
                  onChange={date => setDatetime(date)}
                  />

              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Box pt={1.3}>
               <TextField
                  autoFocus
                  color="primary"
                  margin="dense"
                  id="name"
                  label="Location"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon style={{ color: "#5f5f5f" }} />
                      </InputAdornment>
                    ),
                  }}
                  value={location}
                  onChange={(event) => { setLocation(event.target.value) }}
                />
                <TextField
                  autoFocus
                  color="primary"
                  margin="dense"
                  id="name"
                  label="Notes"
                  multiline
                  rows="3"
                  variant="outlined"
                  fullWidth
                  value={notes}
                  onChange={(event) => { setNotes(event.target.value) }}
                />
              </Box>
            </Grid>

          </Grid>

        </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={props.onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onSaveClick} color="primary" variant="contained" autoFocus>
            Save
          </Button>
        </DialogActions>

      </Box>
      </Dialog>
    </div>
  );
}