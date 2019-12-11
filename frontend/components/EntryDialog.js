import React, { useState } from 'react';
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

  // set a breakpoint at sm = 600px width
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
            <Slider />
            <Grid container justify="space-between">
              <Grid item>
                <span style={{color: "#70a987"}}><b>None</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#c7ac40"}}><b>Mild</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#cc7f47"}}><b>Moderate</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#b35d74"}}><b>Severe</b></span>
              </Grid>
              <Grid item>
                <span style={{color: "#8f3d62"}}><b>Worst</b></span>
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
          <Button autoFocus onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onClose} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>

      </Box>
      </Dialog>
    </div>
  );
}