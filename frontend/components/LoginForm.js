import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = (props) => {

  // next.js built-in frontend router
  const router = useRouter();

  // authentication stuff
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginError, setLoginError ] = useState(false);

  // send login request when "sign in" button is clicked
  const loginUser = () => {

    const userCred = {
      email: email,
      password: password,
    }

    // todo change URL to env variable
    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCred),
    })
    .then((response) => {
      return response.json();
    })
    .then(user => {

      // server will return a user object with an auth token if the credentials
      // received are valid, otherwise will return an empty object

      // so, if login credentials are valid:
      if(user.token) {

        // save auth token to cookie in user's browser
        // todo add expiration to cookie
        document.cookie = `authToken=${user.token}; path=/;`;

        // add auth token to global state
        setAuthToken(user.token,
          () => {
            // navigate to logged-in view
            router.push('/app/chartview');
          });
      }
      // otherwise if login credentials are invalid:
      else {
        setLoginError(true);
      }
    }); // end of fetch chain

  }

  return(
    <Box
      display="flex"
      flexDirection="column"
      align="center"
      justifyContent="space-between"
      height="100%"
      width="100%"
      mb={2}
      >

      <Box>
        <Box color="secondary.main">
            {loginError? "Invalid email/password combination" : ""}
        </Box>
        <TextField
          fullWidth
          color="primary"
          margin="dense"
          autoComplete="off"
          type="email"
          id="email"
          label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          color="primary"
          margin="dense"
          autoComplete="off"
          type="password"
          id="password"
          label="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Box>

      <Button onClick={loginUser} variant="contained" color="primary" size="large">
        Sign In
      </Button>
    </Box>
    );
};

export default LoginForm
