import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function MenuAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <ElevationScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>

          <IconButton edge="start" disabled>
            <FilterDramaTwoToneIcon fontSize="large" />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Under The Weather
          </Typography>

          <Box mr={2}>
            <Link href={props.buttonLink} underline="none">
              <Button variant="contained" color="secondary">
                {props.buttonLabel}
              </Button>
            </Link>
          </Box>

          <div>
            <Link href="/app/account" underline="none">
              <IconButton
                aria-label="account of current user"
                style={{ color: "#fff" }}
                >
                <AccountCircle fontSize="large" />
              </IconButton>
            </Link>
          </div>

        </Toolbar>
      </AppBar>
    </ElevationScroll>
    </div>
  );
}