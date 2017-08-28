import React, { Component } from 'react';
import './Inputs.css';

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

    handleSubmit(event) {
        event.preventDefault(); 

        if (this.state.sub.trim().length > 3 && this.state.sub.trim().length < 20) {
            if (this.state.sub.trim() !== '' && this.state.flair.trim() !== '') {
                window.location.href = `?sub=${this.state.sub}&flair=${this.state.flair}`;
            } else if (this.state.sub.trim() !== '') {
                window.location.href = `?sub=${this.state.sub}`;
            }
        } else {
            // If they didn't enter any non-whitespace,
            this.setState({sub: ''}); // clear the input box of whitespace,
            document.getElementById('sub').focus(); // and re-focus the required input.
        }
    }

    componentDidMount() {
        // On first load, focus required area using refs.
        this.input.focus(); 
    }

    // TODO: Stylize this and add a dropdown for commonly used generators.
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
            </div>
        );
    }
}

export default Inputs;