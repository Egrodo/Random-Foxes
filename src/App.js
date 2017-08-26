import React, { Component } from 'react';
import Images from './Images';
import './App.css';
class App extends Component {

    render() {
        const domain = new URL(window.location.href);
        const sub = domain.searchParams.get('sub') || null;
        const flair = domain.searchParams.get('flair') || null;
        if (sub !== null && flair !== null) {
            return (
                <Images sub={sub} flair={flair} />
            );
        } else {
            return (
                <div className="App">
                    <h1 className="instructions">
                      Reddit Image Generator
                    </h1>
                    <div className="instructions">
                        <p>
                          Type in the subreddit and flair of the images you want to generate below. Or choose a pre-selected combination!
                        </p>
                    </div>
                    <form>
                        <input>
            
                        </input>
                    </form>
                </div>
            );
        }
    }
}

export default App;
