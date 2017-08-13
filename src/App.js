import React, { Component } from 'react';
import Images from './Images.js';
import oauth from './oauth_info.json';
import './App.css';

const snoowrap = require('snoowrap');

const r = new snoowrap(oauth);

console.log(r);

class App extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      author: ''
    };
  }

  generateImage() {
    console.log("generating image");
  }

  render() {
    return (
      <div className="App">
        <Images image={this.generateImage}/>
        <p>
          Click on the fox to get a new one!
        </p>
      </div>
    );
  }
}

export default App;
