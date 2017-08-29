import React, { Component } from 'react';
import './Inputs.css';
import oauth from './oauth_info.json'; // Please don't steal whilst I don't know how to use node env vars :(
import Presets from './Presets';

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: '',
            flair: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // On every keypress, update the state with new content.
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    sendTo(sub, flair) {
        const Snoowrap = window.snoowrap;
        const r = new Snoowrap(oauth);

        r.getSubreddit(sub).created_utc.then(() => {
            if (flair) {
                window.location.href = `?sub=${sub}&flair=${flair}`;
            } else {
                window.location.href = `?sub=${sub}`;
            }
            
        }).catch(() => {
            console.log('invalid sub'); 
            // If user-provied sub doesn't exist,
            this.setState({sub: ''}); // clear the input box of whitespace,
            document.getElementById('sub').focus(); // re-focus the required input,
            document.getElementById('errorDisplay').innerHTML = 'That subreddit doesn\'t exist.'; // and display error messasge.
        });
    }

    handleSubmit(event) {
        const sub = this.state.sub.trim();
        const flair = this.state.flair.trim();
        event.preventDefault(); 
        if (sub.length > 2 && sub.length < 21) {
            if (sub !== '' && flair !== '') {
                // If user provided both sub and flair.
                this.sendTo(sub, flair);
            } else if (sub !== '') {
                // If user only provided sub.
                this.sendTo(sub);
            }
        } else {
            // If user only entered whitespace
            this.setState({sub: ''}); // clear the input box of whitespace,
            document.getElementById('sub').focus(); // and re-focus the required input.
            document.getElementById('errorDisplay').innerHTML = 'Invalid input.';
        }

    }

    componentDidMount() {
        // On first load, focus required area using refs.
        this.input.focus(); 
    }

    // TODO: Add dropdown for commonly used expressions.
    render() {
        return (
            <div className="App">
                <h1 className="instructions">
                    Reddit Image Generator
                </h1>
                <div className="instructions">
                    <p>
                        This tool will attempt to display random images from a given subreddit. 
                        Optionally, you can filter them by post flair as well.
                    </p>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h1>
                            Sub:
                        </h1>
                        <input 
                            ref={(input) => { this.input = input; }} 
                            id='sub'
                            type='text'
                            value={this.state.sub}
                            onChange={this.handleChange}
                            spellCheck='false'
                            autoComplete="off"
                            maxLength='20'
                            required
                        />
                    </label>
                    <label>
                        <h1>
                            Flair:
                        </h1>
                        <input 
                            id='flair'
                            type='text'
                            value={this.state.flair}
                            onChange={this.handleChange}
                            spellCheck='false'
                            autoComplete="off"
                        />
                    </label>
                    <input 
                        type='submit'
                        value='Submit'
                    />
                </form>
                <p id='errorDisplay'>

                </p>
                
                <Presets />
            </div>
        );
    }
}

export default Inputs;