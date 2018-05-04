import React, { Component } from 'react'

import Header from './components/Header'
import Contents from './components/Content'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <Contents />
      </div>
    );
  }
}

export default App;
