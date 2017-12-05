import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

   var config = {
     apiKey: "AIzaSyDnsjBCWSd61fmw0ZDWUjDVUhYwdvUfqtA",
     authDomain: "ambulo-9e867.firebaseapp.com",
     databaseURL: "https://ambulo-9e867.firebaseio.com",
     projectId: "ambulo-9e867",
     storageBucket: "",
     messagingSenderId: "328297973866"
   };
   firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
