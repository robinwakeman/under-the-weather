import React from 'react';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        scroll="body"
        aria-labelledby="responsive-dialog-title"
      >
      <Box m={4}>

        <DialogTitle id="responsive-dialog-title">
          How would you rate your arthritis today?
        </DialogTitle>

        <DialogContent>
        <Grid container direction="column" spacing={4}>

          <Grid item>
            <DialogContentText>
            Rate your pain on a scale of 0 to 10:
            </DialogContentText>
          </Grid>

          <Grid item>
            <Slider />
            <Grid container justify="space-between">
              <Grid item>
                <DialogContentText>None</DialogContentText>
              </Grid>
              <Grid item>
                <DialogContentText>Mild</DialogContentText>
              </Grid>
              <Grid item>
                <DialogContentText>Moderate</DialogContentText>
              </Grid>
              <Grid item>
                <DialogContentText>Severe</DialogContentText>
              </Grid>
              <Grid item>
                <DialogContentText>Worst</DialogContentText>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>

            <Grid item xs={6}>
              <Grid container direction="column">
                <DatePicker label="Date"/>
                <TimePicker label="Time" />

              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Box pt={1.3}>
               <TextField
                  autoFocus
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
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Notes"
                  multiline
                  rows="3"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Grid>

          </Grid>

        </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Save
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Discard
          </Button>
        </DialogActions>

      </Box>
      </Dialog>
    </div>
  );
}