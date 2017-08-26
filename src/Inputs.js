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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        window.location.href = `?sub=${this.state.sub}&flair=${this.state.flair}`;
    }

    render() {
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Sub:
                        <input 
                            id='sub'
                            type='text'
                            value={this.state.sub}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Flair:
                        <input 
                            id='flair'
                            type='text'
                            value={this.state.flair}
                            onChange={this.handleChange}
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