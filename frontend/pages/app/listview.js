import React, {useEffect, useState} from 'react';
import Page from '~/components/Page';
import List from '~/components/List';
import EntryDialog from '~/components/EntryDialog';
import ConfirmationDialog from '~/components/ConfirmationDialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const ListView = () => {

  // dialog controls
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [singleDeleteDialogOpen, setSingleDeleteDialogOpen] = useState(false);
  const [multiDeleteDialogOpen, setMultiDeleteDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);


 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartview"
    >
    <Grid container justify="center">
      <List
        onEdit={()=>{ setEditDialogOpen(true) }}
        onDelete={()=>{ setSingleDeleteDialogOpen(true) }}
        />
    </Grid>


    <Fab
      size="large"
      color="secondary"
      aria-label="add"
      onClick={()=>{
        setCreateDialogOpen(true);
      }}
      >
      <AddIcon />
    </Fab>

    <EntryDialog
      open={createDialogOpen}
      onClose={()=>{
        setCreateDialogOpen(false);
      }}
      dialogTitle="How would you rate your arthritis today?"
      />

    <EntryDialog
      open={editDialogOpen}
      onClose={()=>{ setEditDialogOpen(false) }}
      dialogTitle="Edit Rating"
    />
    <ConfirmationDialog
      open={singleDeleteDialogOpen}
      onClose={()=>{ setSingleDeleteDialogOpen(false) }}
      dialogTitle="Delete Rating"
      dialogType="confirmSingleDelete"
    />
     <ConfirmationDialog
      open={multiDeleteDialogOpen}
      onClose={()=>{ setMultiDeleteDialogOpen(false) }}
      dialogTitle="Delete Ratings"
      dialogType="confirmMultiDelete"
    />
     <ConfirmationDialog
      open={locationDialogOpen}
      onClose={()=>{ setDeleteDialogOpen(false) }}
      dialogTitle="Change Location"
      dialogType="locationChange"
    />

  </Page>
  )};

export default ListView