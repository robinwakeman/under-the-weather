import React, { useEffect } from 'react';
import { useGlobal } from 'reactn'
import { useRouter } from 'next/router'
import AppBar from '~/components/AppBar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Page(props) {

  // next.js built-in frontend router
  const router = useRouter();

  const [ authToken, setAuthToken ] = useGlobal('authToken');

  // redirect users without active token to logged-out view
  useEffect(() => {
    if(!authToken) {
      router.push('/register');
    }
  },[authToken]);

  return (
    <React.Fragment>
      <AppBar
        buttonLabel={props.appBarButtonLabel}
        buttonLink={props.appBarButtonLink}
        />
      <Box mt={10} mb={10}>
      <Container>
        {props.children}
      </Container>
      </Box>
    </React.Fragment>
    );
}
