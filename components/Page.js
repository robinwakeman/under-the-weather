import React from 'react';
import AppBarWrapper from '~/components/AppBarWrapper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Page(props) {
  return (
    <React.Fragment>
      <AppBarWrapper/>
      <Box mt={12}>
      <Container>
        {props.children}
      </Container>
      </Box>
    </React.Fragment>
    );
}