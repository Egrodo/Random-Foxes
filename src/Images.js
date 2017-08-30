import React, { Component } from 'react';
import './Images.css';
import PropTypes from 'prop-types';
import oauth from './oauth_info.json'; // Please don't steal whilst I don't know how to use node env vars :(
const Snoowrap = window.snoowrap;

const r = new Snoowrap(oauth);

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            lastId: '',
            imgUrl: '',
            postUrl: '',
            description: '',
            author: '',
            sub: props.sub || null,
            flairFilter: props.flairFilter || false,
            flair: props.flair || null
        };

        this.generateImage = this.generateImage.bind(this);
        this.generatePosts = this.generatePosts.bind(this);        
        this.clickHandler = this.clickHandler.bind(this);
    }

    generatePosts() {
        // Generate promise to get 10 posts from hot.
        console.log('generating posts. lastId: ', this.state.lastId);
        const myPromise = r.getSubreddit(this.state.sub).getHot({limit: 25, after: this.state.lastId});
        myPromise.then((listing) => {

            this.setState({lastId: listing._query.after});
            if (this.state.flairFilter === true) {
                listing.forEach((post) => {
                    if (post.link_flair_text === this.state.flair) {
                        console.log('found flair match');
                        this.setState({posts: this.state.posts.concat(post)});
                    }
                });
            } else {
                listing.forEach((post) => {
                    this.setState({posts: this.state.posts.concat(post)});
                });
            }
            this.generateImage();
        }).catch((error) => {
            // BUG: If the generated posts contains no flair-matches, user will have to click twice.
            console.log(`ERROR >>> ${error}`);
        });
    }

    clickHandler() {
        // Limit clicks to once per second as to not overload browser.
        if (this.state.posts.length > 0) {
            this.generateImage();
        } else {
            // If out of foxes,
            // get more using the last post ID as the `after` on Reddit's API.
            this.generatePosts();
        }
    }

    generateImage() {
        // TODO: How do I cleanly handle what happens when user enters invalid flair?
        const rand = Math.floor(Math.random() * this.state.posts.length); // Get random number from 1 to length of posts.
        const currPost = this.state.posts[rand];
        const posts = this.state.posts;
        posts.splice(rand, 1); // Generate a random post, then remove it from the posts array so we don't display it again.
        this.setState({posts: posts});

        if (!currPost.url.endsWith('.jpg') && !currPost.url.endsWith('.png') && !currPost.url.endsWith('.gif')) { // Fix non-direct links.
            currPost.url += '.jpg'; // Account for non-direct links.
        }
        if (currPost.url.indexOf('https') === -1) { // Fix non-secure links.
            currPost.url = currPost.url.replace('http', 'https');
        }
        
        
        this.setState({
            postUrl: `https://reddit.com${currPost.permalink}`,
            imgUrl: currPost.url,
            description: currPost.title,
            author: currPost.author.name,
            flair: currPost.link_flair_text || 'None'
        });
    }

    componentDidMount() {
        // When component mounts for first time, generate posts.
        this.generatePosts();
    }

    render() {
        return (
            <div className="App">
                <p className="instructions">
                  Tap on the image to go to the next one!
                </p>
                <div className="imgContainer">
                    <img onClick={this.clickHandler} title={this.state.description} alt={this.state.description} src={this.state.imgUrl} />
                    <a alt='Go to post.' title='Go to post.' href={this.state.postUrl} id="info" className="info"> 
                        {`"${this.state.description}" from user ${this.state.author}`}
                    </a>
                    <p className='info'>
                        {`Flair: ${this.state.flair}`}
                    </p>
                    <p className='info'>
                        <a href="?">Go Back</a>
                    </p>
                </div>
            </div>
        );
    }
}

// Typechecking for props
Images.propTypes = {
    sub: PropTypes.string.isRequired,
    flairFilter: PropTypes.bool,
    flair: PropTypes.string
};

export default Images;
