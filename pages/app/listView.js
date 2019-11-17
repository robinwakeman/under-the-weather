import React, {useEffect, useState} from 'react';
import Page from '~/components/Page';
import List from '~/components/List';

const ListView = () => {

 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartView"
    >

    <List />

  </Page>
  )};

export default ListView