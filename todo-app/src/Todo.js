import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import { Modal, makeStyles, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'; // material ui icon import ile ceke bilirsen
import EditIcon from '@material-ui/icons/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }, //modalin cssi
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const updateToDo = () => {
        // uptade the todo with the new input text

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })

        setOpen(false);
    }
    // remove mdi mdi-close-circle-outline
    // width: 600, marginRight: 370
    return (
        <div  className="container card w-50">

            <div className="list-wrapper">
                <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                        <div className="form-check float-left bg-blue">
                            <label className="form-check-label">
                                <input className="checkbox" type="checkbox" />{props.todo.todo}<i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="enSonaAl">
                            <EditIcon fontSize="small" onClick={e => setOpen(true)}></EditIcon>
                            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}></DeleteForeverIcon>
                        </div>
                    </li>
                </ul>
            </div>


            <Modal open={open} onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>I am a modal</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                    <Button variant="primary" onClick={updateToDo}>Update ToDo</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Todo
