import React from 'react';
import Greetings from 'clone-coding/Greetings';
import {TopToolbar} from 'react-admin';
import {Button} from '@mui/material';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Counter from 'clone-coding/Counter';
import MyForm from 'clone-coding/MyForm';
import CounterReducer from 'clone-coding/CounterReducer';
import ReducerSample from 'clone-coding/ReducerSample';
import {SampleProvider} from 'clone-coding/SampleContext';

function App() {
  const onClick = (name: string) => {
    console.log(`${name} says Hello`);
  };
  const onSubmit = (form: {name: string; description: string}) => {
    console.log(form);
  };
  return (
    <div className="App">
      <TopToolbar />
      <header className="App-header"></header>
      <Button variant="contained" color="secondary" size="small">
        Hello world
      </Button>
      <Button variant="contained">Hello world2</Button>
      <Button variant="outlined" color="primary" size="large">
        Hello world3
      </Button>
      <>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
          Save
        </Button>
        <Button variant="contained" color="secondary" endIcon={<DeleteIcon />}>
          Delete
        </Button>
        <IconButton aria-label="star">
          <StarIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="favorite">
          <FavoriteIcon />
        </IconButton>
        <Greetings name="react" optional="option" onClick={onClick} />
        <Counter />
        <CounterReducer />
        <SampleProvider>
          <ReducerSample />
        </SampleProvider>
        <MyForm onSubmit={onSubmit} />
      </>
    </div>
  );
}

export default App;
