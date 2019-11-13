import React from 'react';
import AppBar from '~/components/AppBar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Page(props) {
  return (
    <React.Fragment>
      <AppBar buttonLabel={props.appBarButtonLabel}/>
      <Box mt={10} mb={10}>
      <Container>
        {props.children}
      </Container>
      </Box>
    </React.Fragment>
    );
}