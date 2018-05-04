import React, { Component } from 'react';
import Style from './App.css'
import Header from './Header.js'
import Contents from './Contents.js'


class App extends Component {
  render() {
    return (
      <div >
        <Header />
        <Contents />
      </div>
    );
  }
}

export default App;
