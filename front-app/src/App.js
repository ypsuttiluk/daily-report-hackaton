import React, { Component } from 'react'
import firebase from 'firebase'

import Header from './components/Header'
import Contents from './components/Content'
import './App.css';
import Addteam from './components/Addteam';
const config = {
  apiKey: "AIzaSyAPHQAAG6znTUbG6PL7Oiw2hwI50lrPtQY",
  authDomain: "daily-report-14ce7.firebaseapp.com",
  databaseURL: "https://daily-report-14ce7.firebaseio.com",
  projectId: "daily-report-14ce7",
  storageBucket: "daily-report-14ce7.appspot.com",
  messagingSenderId: "545247969478"
}
firebase.initializeApp(config)

class App extends Component {
  render() {
    console.log(firebase.app().name)
    return (
      <div >
        <Header />
        <Contents />
        <Addteam />
        
      </div>
    );
  }
}

export default App;
