import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import { TextField, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const useStyles4Button = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const classes = useStyles();
  const classes4Button = useStyles4Button();

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput('');
  }
 
  // onKeyPress={(ev)=>{if(ev.key === 'Enter'){ev.preventDefault()}}}
  return (
    <div className="App">
      <h1>List4ToDo ☘  </h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField value={input} onChange={event => setInput(event.target.value)} id="standard-basic" label="Type a ToDo" />
        <Button disabled={!input} onClick={addTodo} id="addButton" variant="outlined" size="small" color="primary" className={classes4Button.margin}>
          Add
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>

    </div>
  );
}


export default App;
