import React, {useEffect, useState} from 'react';
import { useGlobal } from 'reactn';
import Page from '~/components/Page';
import Button from '@material-ui/core/Button';

const Account = () => {

  const [ authToken, setAuthToken ] = useGlobal('authToken');

  const logout = () => {
    setAuthToken('');
    document.cookie = 'authToken= ; path=/;';
  };

 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartview"
    >

    <Button
      onClick={logout}
    >
      Sign Out
    </Button>

  </Page>
  )};

export default Account