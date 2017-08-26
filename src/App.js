import React, { Component } from 'react';
import Images from './Images';
import Inputs from './Inputs';
class App extends Component {

    render() {
        const domain = new URL(window.location.href);
        const sub = domain.searchParams.get('sub') || null;
        const flair = domain.searchParams.get('flair') || null;
        if (sub !== null && flair !== null) {
            return (
                <Images sub={sub} flairFilter={true} flair={flair} />
            );
        } else if (sub !== null) {
            return (
                <Images sub={sub} />
            );
        } else {
            return (
                <Inputs />
            );
        }
    }
}

export default App;
