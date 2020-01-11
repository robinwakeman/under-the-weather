import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const RegisterForm = (props) => {

    // next.js built-in frontend router
  const router = useRouter();

  // authentication stuff
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ registerError, setRegisterError ] = useState(false);

  // send new account request when "sign up" button is clicked
  const registerUser = () => {

    const newUser = {
      email: email,
      password: password,
    }

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser),
    })
    .then((response) => {
      return response.json();
    })
    .then(user => {

      // server will return a user object with an auth token if the user
      // registration was successful, otherwise will return an empty object

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
      else {
        setRegisterError(true);
      }
    }); // end of fetch chain

  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      align="center"
      justifyContent="space-between"
      height="100%"
      width="100%"
      mb={1}
      >
      <Box color="secondary.main">
        {registerError? "Registration unsuccessful" : ""}
      </Box>
      <Box>
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
          required
        />
      </Box>
      <Box mb={3}>
        <TextField
          fullWidth
          color="primary"
          margin="dense"
          autoComplete="off"
          id="password"
          label="new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Box>
      <Button onClick={registerUser} variant="contained" color="primary" size="large">
        Sign Up
      </Button>
    </Box>
    );
};

export default RegisterForm