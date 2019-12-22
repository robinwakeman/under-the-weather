import React, { useState } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import { fade, lighten, darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  margin: {
    height: theme.spacing(3),
  },
  // override built-in MUI styles with classes, and adapt based on "props"
  //  in order to colour-code slider according to pain category
  root: props => ({
    width: '100%',
    color: props.color,
  }),
  mark: props => ({
    backgroundColor: props.backgroundColor,
  }),
  rail: {
      backgroundColor: "#000",
    },
  track: props => ({
    backgroundColor: props.backgroundColor,
  }),
  thumb: props => ({
      position: 'absolute',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -5,
      boxSizing: 'border-box',
      borderRadius: '50%',
      outline: 0,
      backgroundColor: props.backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create(['box-shadow'], {
        duration: theme.transitions.duration.shortest,
      }),
      '&::after': {
        position: 'absolute',
        content: '""',
        borderRadius: '50%',
        // reach 42px hit target (2 * 15 + thumb diameter)
        left: -15,
        top: -15,
        right: -15,
        bottom: -15,
      },
      '&$focusVisible,&:hover': {
        boxShadow: `0px 0px 0px 8px ${fade(props.backgroundColor, 0.16)}`,
        '@media (hover: none)': {
          boxShadow: 'none',
        },
      },
      '&$active': {
        boxShadow: `0px 0px 0px 14px ${fade(props.backgroundColor, 0.16)}`,
      },
      '$vertical &': {
        marginLeft: -5,
        marginBottom: -6,
      },
    }),

}));

// aria-label
function valuetext(value) {
  return `Pain rating: ${value}`;
}

// map each pain rating value to a color code
// (based on a commonly-used pain assessment scale)
function getPainColor(rating) {
  switch(rating) {
    case 0:
      return "#07ab84"; // no pain
    case 1:
    case 2:
    case 3:
      return "#FEB019"; // mild pain
    case 4:
    case 5:
    case 6:
      return "#F86624"; // moderate pain
    case 7:
    case 8:
    case 9:
      return "#EA3546"; // severe pain
    case 10:
      return "#820057"; // worst possible pain
  }
}

export default function DiscreteSlider(props) {

  // update the pain rating color code alongside the slider value
  let painColorCode = {};
  painColorCode.color = getPainColor(props.value);
  painColorCode.backgroundColor = getPainColor(props.value);

  // pass the color code as props to makeStyles to change the color of the slider
  const classes = useStyles(painColorCode);


  return (
    <div className={classes.root}>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={10}
        valueLabelDisplay="on"
        classes={{
              root: classes.root,
              mark: classes.mark,
              rail: classes.rail,
              track: classes.track,
              thumb: classes.thumb,
            }}
        {...props}
      />
    </div>
  );
}