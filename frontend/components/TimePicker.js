import 'date-fns';
import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

export default function MaterialUIPickers(props) {

  return (
    <KeyboardTimePicker
      color="primary"
      margin="normal"
      id="time-picker"
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
      {...props}
    />
  );
}