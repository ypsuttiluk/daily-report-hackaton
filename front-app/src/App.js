import React, { Component } from 'react'
import firebase from 'firebase'

import Header from './components/Header'
import Contents from './components/Content'
import ManageTeam from './components/ManageTeam'
import ManageUser from './components/ManageUser'
import Team from './components/Team'
import './App.css';

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
  // getData = () => {
  //   firebase.database().ref('/teams/').once('value')
  //   .then((response) => {
  //       console.log(response.val())
  //   })
  //   // firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  //   //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //   //   // ...
  //   // });
  // }
  
  render() {
    console.log(firebase.app().name)
    return (
      <div >
        <Header />
        <ManageTeam/>
        <ManageUser/>
        <Contents />
        <Team />
      </div>
    );
  }
}

export default App;
