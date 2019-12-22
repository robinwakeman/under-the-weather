import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default function MaterialUIPickers(props) {

  return (
    <KeyboardDatePicker
      color="primary"
      margin="normal"
      id="date-picker-dialog"
      format="MM/dd/yyyy"
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      {...props}
    />
  );
}