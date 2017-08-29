import React, { Component } from 'react';
import './Presets.css';

class Presets extends Component {


    render() {
        return (
            <ul>
                <li className='sub-menu-parent'>
                    <h1>Or try a preset.</h1>
                    <ul className='sub-menu'>
                        <li><a href='?sub=foxes&flair=Pics!'>Fox Pictures</a></li>
                        <li><a href='?sub=cats&flair=Cat Picture'>Cat Pictures</a></li>
                        <li><a href='?sub=puppies'>Dog Pictures</a></li>
                        <li><a href='?sub=EarthPorn'>Earth Porn</a></li>
                        <li><a href='?sub=CityPorn'>City Porn</a></li>
                    </ul>
                </li>
            </ul>
        );
    }
}

export default Presets;