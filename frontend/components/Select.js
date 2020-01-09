import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [weatherMetric, setWeatherMetric] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setWeatherMetric(event.target.value); // for Select
    props.onChange(event.target.value); // for chartview -> Chart
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={weatherMetric}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="temperature">Temperature (°F)</MenuItem>
          <MenuItem value="apparentTemperature">"Feels Like" (°F)</MenuItem>
          <MenuItem value="pressure">Pressure (mb)</MenuItem>
          <MenuItem value="precipIntensity">Precipitation (inches)</MenuItem>
          <MenuItem value="Humidity"> Relative Humidity (%)</MenuItem>
          <MenuItem value="dewPoint">Dew Point (°F)</MenuItem>
          <MenuItem value="cloudCover">Cloud Cover (%)</MenuItem>
          <MenuItem value="ozone">Ozone (Dobson units)</MenuItem>
          <MenuItem value="uvIndex">UV Index</MenuItem>
          <MenuItem value="windSpeed">Wind Speed</MenuItem>
          <MenuItem value="visibility">Visibility (miles)</MenuItem>
          <MenuItem value="moonPhase">Moon Phase (full= 0.5)</MenuItem>
          <MenuItem value="sunriseTime">Sunrise (hh:mm)</MenuItem>
          <MenuItem value="sunsetTime">Sunset (hh:mm)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}