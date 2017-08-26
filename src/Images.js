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
            lastClick: 0,
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
        this.clickHandler = this.clickHandler.bind(this);
        this.generatePosts = this.generatePosts.bind(this);
        
    }

    generatePosts(lastId) {
    // First you'll view a random selection of the top 10 posts of all time. Then, after exhausing those, you'll go to the next 25, etc.
        const myPromise = r.getSubreddit(this.state.sub).getTop({time: 'all', limit: 10, after: lastId}); // After not working?
        myPromise.then((listing) => {
            this.setState({lastId: listing._query.after});

            // TODO: If flair is null, no need to filter, attempt to display all. Maybe display flair somewhere though.
            if (this.state.flairFilter === true) {
                listing.forEach((post) => {
                    if (post.link_flair_text === this.state.flair) {
                        this.setState({posts: this.state.posts.concat(post)});
                    }
                });
            } else {
                listing.forEach((post) => {
                    this.setState({posts: this.state.posts.concat(post)});
                });
            }
            this.generateImage();
        }, error => {
            console.log(`ERROR >>> ${error}`);
        });
    }

    clickHandler() {
    // Limit clicks to once per second as to not overload browser.
        if (Date.now() - this.state.lastClick > 300) {
            this.setState({lastClick: Date.now()});
            if (this.state.posts.length > 0) {
                this.generateImage();
            } else {
                // If out of foxes,
                // store our location in localStorage.
                localStorage.setItem('lastPostId', this.state.lastId);
                console.log('hit limit, saving', localStorage.lastPostId);
                // get more using the last post ID as the `after` on Reddit's API.
                this.generatePosts(this.state.lastId);
            }
        }
    }

    generateImage() {
        const rand = Math.floor(Math.random() * this.state.posts.length); // Get random number from 1 to length of posts.
        const currPost = this.state.posts[rand];
        this.state.posts.splice(rand, 1); // Generate a random post, then remove it from the posts array so we don't display it again.

        // TODO: account for / ignore albums.
        if (!currPost.url.endsWith('.jpg')) { // Fix non-direct links.
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

    componentWillMount() { // On first load.
        // If the user has visited the site before,
        // continue from where they left off.
        // TODO: Sometimes the after id it stores breaks, can't rely on it forever.
        if (typeof(Storage) !== 'undefined') {
            if (localStorage.lastPostId) {
                this.generatePosts(localStorage.lastPostId);
            } else {
                this.generatePosts();
            }
        }
    }

    render() {
        return (
            <div className="App">
                <p className="instructions">
                  Click on the image to go to the next one!
                </p>
                <div className="imgContainer">
                    <img onClick={this.clickHandler} onError={this.clickHandler} title={this.state.description} alt={this.state.description} src={this.state.imgUrl} />
                    <a alt='Go to post.' title='Go to post.' href={this.state.postUrl} id="info" className="info"> 
                        {`"${this.state.description}" from user ${this.state.author}`}
                    </a>
                    <p className='info'>
                        {`Flair: ${this.state.flair}`}
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
