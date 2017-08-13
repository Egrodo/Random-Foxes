import React, { Component } from 'react';
import Images from './Images.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <p className="instructions">
          Click on the fox for more fox!
        </p>
        <Images />
      </div>
    );
  }
}

export default App;
