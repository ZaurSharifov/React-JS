// const firebaseConfig = {

//   };

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAl4BvZxaM8p7PQx-icKKVtoYhMuMGdQ_o",
    authDomain: "todo-app-62fa2.firebaseapp.com",
    databaseURL: "https://todo-app-62fa2.firebaseio.com",
    projectId: "todo-app-62fa2",
    storageBucket: "todo-app-62fa2.appspot.com",
    messagingSenderId: "268818981681",
    appId: "1:268818981681:web:d63af2b841e34438ec0610",
    measurementId: "G-F1RRG9NN4Y"
});

const db = firebaseApp.firestore();

export default db;
