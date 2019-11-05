import React from 'react';
import AppBarWrapper from '~/components/AppBarWrapper';
import Container from '@material-ui/core/Container';

export default function Page(props) {
  return (
    <React.Fragment>
      <AppBarWrapper/>
      <Container>
        {props.children}
      </Container>
    </React.Fragment>
    );
}