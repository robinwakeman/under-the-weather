import React, { useState } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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

const entries = [
    {
      location: 'Ottawa',
      rating: 8,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'Took XYZ medication today',
    },
    {
      location: 'Sault Ste. Marie',
      rating: 10,
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
      rating: 8,
      date: 'June 26',
      day: 'Mon',
      time: '1:30 PM',
      notes: 'this is a note',
    },
    {
      location: 'Toronto',
      rating: 10,
      date: 'June 30',
      day: 'Tue',
      time: '8:30 PM',
      notes: '',
    },
    {
      location: 'Ottawa',
      rating: 2,
      date: 'June 26',
      day: 'Thu',
      time: '1:30 PM',
      notes: 'this is a note',
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

}));

export default function InteractiveList(props) {
  const classes = useStyles();

  const theme = useTheme();
  // set a breakpoint at sm = 600px width
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
                  <div style={{ width: '34px',
                                height: '34px',
                                backgroundColor: '#FFE5B4',
                                borderRadius: '50%',
                                textAlign: 'center',
                              }}>
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