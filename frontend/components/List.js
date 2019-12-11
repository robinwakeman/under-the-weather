import React, { useState } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// preliminary sample data
const entries = [
    {
      location: 'Ottawa',
      rating: 7,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'Took XYZ medication today',
    },
    {
      location: 'Sault Ste. Marie',
      rating: 6,
      date: 'September 30',
      day: 'Wed',
      time: '12:30 PM',
      notes: '',
    },
    {
      location: 'Ottawa',
      rating: 2,
      date: 'June 26',
      day: 'Thu',
      time: '1:30 PM',
      notes: '',
    },
       {
      location: 'Ottawa',
      rating: 0,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'this is a note',
    },
    {
      location: 'Toronto',
      rating: 3,
      date: 'June 30',
      day: 'Tue',
      time: '8:30 PM',
      notes: '',
    },
    {
      location: 'Ottawa',
      rating: 6,
      date: 'June 26',
      day: 'Thu',
      time: '1:30 PM',
      notes: 'this is a note',
    },
     {
      location: 'Ottawa',
      rating: 10,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'Took XYZ medication today',
    },
    {
      location: 'Sault Ste. Marie',
      rating: 9,
      date: 'September 30',
      day: 'Wed',
      time: '12:30 PM',
      notes: '',
    },
    {
      location: 'Ottawa',
      rating: 3,
      date: 'June 26',
      day: 'Thu',
      time: '1:30 PM',
      notes: '',
    },
       {
      location: 'Ottawa',
      rating: 2,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'this is a note',
    },
    {
      location: 'Toronto',
      rating: 0,
      date: 'June 30',
      day: 'Tue',
      time: '8:30 PM',
      notes: '',
    },
]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 900,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  ratingContainer: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    textAlign: 'center',
  },
  noPain: {
    backgroundColor: '#c0f5b3',
  },
  mildPain: {
    backgroundColor: '#faffab',
  },
  moderatePain: {
    backgroundColor: '#ffcea3',
  },
  severePain: {
    backgroundColor: '#fac0d0',
  },
  worstPain: {
    backgroundColor: '#d98fb5',
  },
}));

// map each pain rating value to a specific class representing
//  a color-code (based on a commonly-used pain assessment scale)
const getPainType = (rating) => {
  switch(rating) {
    case 0:
      return "noPain";
    case 1:
    case 2:
    case 3:
      return "mildPain";
    case 4:
    case 5:
    case 6:
      return "moderatePain";
    case 7:
    case 8:
    case 9:
      return "severePain";
    case 10:
      return "worstPain";
  }
};

export default function InteractiveList(props) {

  const classes = useStyles();

  // set a breakpoint at sm = 600px width
  const theme = useTheme();
  const isLessThanSm = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <List>
      {entries.map(entry =>
        <Paper elevation={2}>
        <Box
          pl={isLessThanSm ? 1 : 3}
          pr={2}
          my={1}
          >
          <ListItem>
            <Grid container xs={12} alignItems="center" justify="space-between">

                  <Grid item xs={isLessThanSm ? 2 : 1}>
                  <div className={`${classes.ratingContainer} ${classes[getPainType(entry.rating)]}`}>
                    <Typography variant="h6">
                      {entry.rating}
                    </Typography>
                  </div>
                  </Grid>

              <Grid item xs={isLessThanSm ? 6 : 7}>
                <Box minWidth={isLessThanSm ? 0 : 360}>
                  <ListItemText
                    primary={
                              <div>
                                <span>{isLessThanSm ? "": entry.day + ". "}</span>
                                <span>{entry.date}, {entry.time} </span>
                                {isLessThanSm ? <br/> : null}
                                <span style={{color:'#888', paddingLeft: '6px'}}>{entry.location}</span>
                              </div>
                            }
                    secondary={isLessThanSm ? null : entry.notes}
                  />
                </Box>
              </Grid>
              <Grid item xs={isLessThanSm ? 2 : 1}>
                <IconButton aria-label="edit" onClick={props.onEdit}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="delete" onClick={props.onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        </Box>
        </Paper>
        )}
    </List>
  );
}