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
      time: '1:30 PM',
      date: 'Mon June 26',
      notes: 'this is a note',
    },
    {
      location: 'Toronto',
      rating: 10,
      time: '8:30 PM',
      date: 'Wed June 30',
      notes: 'this is another note this is longer ha ha ha ha ha ha',
    },
    {
      location: 'Ottawa',
      rating: 2,
      time: '1:30 PM',
      date: 'Mon June 26',
      notes: 'this is a note',
    },
    {
      location: 'Ottawa',
      rating: 0,
      time: '1:30 PM',
      date: 'Mon June 26',
      notes: 'this is a note',
    },
    {
      location: 'Ottawa',
      rating: 8,
      time: '1:30 PM',
      date: 'Mon June 26',
      notes: 'this is a note, this one is much longer, notes can be very long',
    },
{
      location: 'Ottawa',
      rating: 8,
      time: '1:30 PM',
      date: 'Mon June 26',
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
  const isLessThanSm = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div>
      <List>
        {entries.map(entry =>
          <Paper elevation={2}>
          <Box px={2} my={1}>
            <ListItem>
              <Grid container xs={12} alignItems="center" justify="space-between">

                    <Grid item xs={2}>
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

                <Grid item xs={6}>
                  <div>
                    <ListItemText
                      primary={
                                <div>
                                  <span>{entry.date}, {entry.time} </span>
                                  <span style={{color:'#888', paddingLeft: '6px'}}>{entry.location}</span>
                                </div>
                              }
                      secondary={isLessThanSm ? null : entry.notes }
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
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
    </div>
  );
}