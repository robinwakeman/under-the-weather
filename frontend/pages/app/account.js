import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Page from '~/components/Page';
import Button from '@material-ui/core/Button';

const Account = () => {

  const [ authToken, setAuthToken ] = useGlobal('authToken');
  const [ userData, setUserData ] = useState('');

  // get user data
  useEffect(() => {
    fetch('http://localhost:3001/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((userProfile) => {

        setUserData(userProfile);

      }); // end of fetch chain

  }, []); // end of useEffect

  const logout = () => {
    setAuthToken('');
    document.cookie = 'authToken= ; path=/;';
  };

 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartview"
    >

    <Button onClick={logout}>
      Sign Out
    </Button>
    {userData.email}

  </Page>
  )};

export default Account