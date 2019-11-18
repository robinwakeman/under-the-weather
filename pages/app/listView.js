import React, {useEffect, useState} from 'react';
import Page from '~/components/Page';
import List from '~/components/List';
import EntryDialog from '~/components/EntryDialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const ListView = () => {

  // open and close new entry dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };


 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartView"
    >
    <Grid container justify="center">

      <Paper>
        <Box ml={3} mr={4}>
          <List
            onEdit={()=>{ setDialogOpen(true) }}/>
        </Box>
      </Paper>
    </Grid>

    <EntryDialog
      open={dialogOpen}
      handleClose={handleClose}
      dialogTitle="Edit Rating"
    />
  </Page>
  )};

export default ListView