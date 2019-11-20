import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 900,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <List>
        {generate(
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked}
                tabIndex={-1}
                disableRipple
                onClick={()=>{
                  if(checked) {
                    setChecked(false);
                  }
                  else {
                    setChecked(true);
                  }
                }}
              />
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Fri Jan 3, 2:45 PM [Ottawa]"
              secondary="Notes contain details about rating entries and stuff and more stuff"
            />
            <Grid container xs={2} justify="space-between">
            <Grid item xs={1}>
                <IconButton aria-label="edit" onClick={props.onEdit}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={props.onDelete}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
              </Grid>
            </Grid>
          </ListItem>,
        )}
      </List>
    </div>
  );
}