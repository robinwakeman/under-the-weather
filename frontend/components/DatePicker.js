import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default function MaterialUIPickers(props) {

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      label={props.label}
      format="MM/dd/yyyy"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  );
}