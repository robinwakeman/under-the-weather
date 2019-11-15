import 'date-fns';
import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <KeyboardTimePicker
      margin="normal"
      id="time-picker"
      label={props.label}
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
    />
  );
}