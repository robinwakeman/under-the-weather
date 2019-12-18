import React, { useState } from 'react';
import { useGlobal } from 'reactn'
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginPage = () => {

  const [ user, setUser ] = useGlobal('user');
  const [ authToken, setAuthToken ] = useGlobal('authToken');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // add auth token to global state
        setAuthToken(user.token);
        // save auth token to cookie in user's browser
        // todo add expiration to cookie
        document.cookie = `authToken=${user.token}`;
      });
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