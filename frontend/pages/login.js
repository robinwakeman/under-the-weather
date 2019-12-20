import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginPage = () => {

  // next.js built-in frontend router
  const router = useRouter();

  // authentication stuff
  const [ user, setUser ] = useGlobal('user');
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // send login request when login button is clicked
  const loginUser = () => {

    const data = {
      email: email,
      password: password,
    }

    // todo change URL to env variable
    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {

        // server will return a user object with an auth token if the credentials
        // received are valid, otherwise will return an empty object
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
      }); // end of fetch chain

  }

  return(
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={loginUser}>
        Login
      </Button>
    </div>
    )
};


export default LoginPage