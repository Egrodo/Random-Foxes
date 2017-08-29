import React, { Component } from 'react';
import 'Presets.css';

class Presets extends Component {


    render() {
        return (
            <nav>
                <label onClick={this.showPresets}>Try a preset</label>
                <ul id='toggle'>
                    <li><a href="?sub=foxes&flair=Pics!">Fox Pictures</a></li>
                    <li><a href="?sub=cats&flair=Cat Picture">Cat Pictures</a></li>
                    <li><a href="">Dog Pictures</a></li>
                    <li><a href="">Earth</a></li>
                    <li><a href="">City</a></li>
                    <li><a href="">Art</a></li>
                    <li><a href="">unsafe</a></li>
                </ul>
            </nav>
        );
    }
}

export default Presets;