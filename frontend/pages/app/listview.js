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

// temporary stub -- todo remove
const defaultLocationStub = 'Ottawa';

const ListView = () => {
  // auth
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  // list data
  const [ entries, setEntries ] = useState([]);
  const [ selectedEntry, setSelectedEntry ] = useState(null);
  // EntryDialog input controls
  const [ rating, setRating ] = useState(0);
  const [ datetime, setDatetime ] = useState(new Date()); // format: 2014-08-18T21:11:54
  const [ location, setLocation ] = useState(defaultLocationStub);
  const [ notes, setNotes ] = useState('');
  // open/close controls for all dialogs
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
        // order entries newest -> oldest for list
        setEntries(responseEntries.reverse());

      }); // end of fetch chain
    },
  []); // end of useEffect


  const clearDialogInputs = () => {
    setRating(0);
    setDatetime(new Date());
    setLocation(defaultLocationStub);
    setNotes('');
  }

  const addNewEntry = () => {

    const newEntry = {
      rating: rating,
      datetime: datetime,
      location: location,
      notes: notes,
      // weather: {}
    };

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
      // order entries newest -> oldest for list
      setEntries(responseEntries.reverse());
      setCreateDialogOpen(false);
      clearDialogInputs();
    });

  }

  const editSelectedEntry = () => {

    const updatedEntry = {
      rating: rating,
      datetime: datetime,
      location: location,
      notes: notes,
      // weather: {}
    };

    fetch(`http://localhost:3001/entries/${selectedEntry._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEntry),
    })
    .then(response => {
      return response.json();
    })
    .then(responseEntries => {
      // order entries newest -> oldest for list
      setEntries(responseEntries.reverse());
      setEditDialogOpen(false);
      clearDialogInputs();
    });
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
      // order entries newest -> oldest for list
      setEntries(responseEntries.reverse());
      setDeleteDialogOpen(false);

    });
  };

 return(
  <Page
    appBarButtonLabel="Chart View"
    appBarButtonLink="/app/chartview"
    >
    <Grid container justify="center">
      <List
        entries={entries}
        onEdit={selectedItem => {
          // set dialog inputs to values of chosen entry
          setSelectedEntry(selectedItem);
          setRating(selectedItem.rating);
          setDatetime(selectedItem.datetime);
          setLocation(selectedItem.location);
          setNotes(selectedItem.notes);

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
      dialogTitle="How would you rate your arthritis today?"
      open={createDialogOpen}
      onSave={addNewEntry}
      onCancel={() => {setCreateDialogOpen(false);}}
      ratingValue={rating}
      ratingOnChange={(event, value) => setRating(value) }
      datetimeValue={datetime}
      datetimeOnChange={date => setDatetime(date)}
      locationValue={location}
      locationOnChange={event => { setLocation(event.target.value); }}
      notesValue={notes}
      notesOnChange={event => { setNotes(event.target.value); }}
      />
    <EntryDialog
      dialogTitle="Edit Rating"
      open={editDialogOpen}
      onSave={editSelectedEntry}
      onCancel={() => {setEditDialogOpen(false);}}
      ratingValue={rating}
      ratingOnChange={(event, value) => setRating(value) }
      datetimeValue={datetime}
      datetimeOnChange={date => setDatetime(date)}
      locationValue={location}
      locationOnChange={event => { setLocation(event.target.value); }}
      notesValue={notes}
      notesOnChange={event => { setNotes(event.target.value); }}
      />
    <ConfirmationDialog
      dialogTitle="Delete Rating"
      dialogType="confirmDelete"
      open={deleteDialogOpen}
      onConfirm={deleteSelectedEntry}
      onCancel={()=>{ setDeleteDialogOpen(false); }}
      />

  </Page>
  )};

export default ListView