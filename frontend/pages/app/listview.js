import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
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
  // auth
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  // list data
  const [ entries, setEntries ] = useState([]);
  const [ selectedEntry, setSelectedEntry ] = useState(null);
  // dialog controls
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


  useEffect(() => {
    // get all entries on ListView render

    fetch('http://localhost:3001/entries', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(responseEntries => {

        setEntries(responseEntries);

      }); // end of fetch chain
    },
  []); // end of useEffect

  const addNewEntry = (rating, datetime, location, notes) => {

    const newEntry = {
      rating: rating,
      datetime: datetime,
      location: location,
      notes: notes,
      // weather: {}
    };

    console.log("listview newEntry:", newEntry);

    fetch('http://localhost:3001/entries', { // todo change URL to env variable
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry),
    })
    .then((response) => {
      return response.json();
    })
    .then(responseEntries => {
      // refresh list component to display new data
      setEntries(responseEntries);
      setCreateDialogOpen(false);
    });

  }

  const editSelectedEntry = () => {

  }

  const deleteSelectedEntry = () => {

    fetch(`http://localhost:3001/entries/${selectedEntry._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      return response.json();
    })
    .then(responseEntries => {

      setEntries(responseEntries);
      setDeleteDialogOpen(false);

    });
  };

  const fakeData = [ // todo remove this
      {
        location: 'Ottawa',
        rating: 7,
        date: 'June 26',
        day: 'Mon',
        time: '1:30 PM',
        notes: 'Took XYZ medication today',
      },
  ];

 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartview"
    >
    <Grid container justify="center">
      <List
        entries={entries}
        onEdit={selectedItem => {
          setSelectedEntry(selectedItem);
          setEditDialogOpen(true);
        }}
        onDelete={selectedItem => {
          setSelectedEntry(selectedItem);
          setDeleteDialogOpen(true);
        }}
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
      onSave={addNewEntry}
      onCancel={() => {setCreateDialogOpen(false);}}
      dialogTitle="How would you rate your arthritis today?"
      />
    <EntryDialog
      open={editDialogOpen}
      onSave={editSelectedEntry}
      onCancel={() => {setEditDialogOpen(false);}}
      dialogTitle="Edit Rating"
      />
    <ConfirmationDialog
      dialogType="confirmDelete"
      open={deleteDialogOpen}
      onConfirm={deleteSelectedEntry}
      onCancel={()=>{ setDeleteDialogOpen(false); }}
      dialogTitle="Delete Rating"
      />

  </Page>
  )};

export default ListView