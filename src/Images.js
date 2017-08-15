import React, { Component } from 'react';
import './Images.css';
import oauth from './oauth_info.json'; // This is not secure, users still have access to them. Would prefer something like node's env vars for prod.
const snoowrap = window.snoowrap;

const r = new snoowrap(oauth);

class Images extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      lastClick: 0,
      lastId: '',
      url: '',
      src: '',
      description: '',
      author: ''
    };

    this.generateImage = this.generateImage.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(lastId) {
    // First you'll view a random selection of the top 25 posts this month. Then, after exhausing those, you'll go to the next 25, etc.
    const getPromise = r.getSubreddit('foxes').getTop({time: 'all', limit: 25, after: lastId});
    getPromise.then((listing) => {
      console.log('Last ID: ', (localStorage.lastPostId ? `${localStorage.lastPostId}` : (this.state.lastId ? `${this.state.lastId}` : `No last ID`)));
      this.setState({lastId: listing._query.after});
      listing.forEach((post, i) => {
        if (post.link_flair_text === 'Pics!') {
          this.setState({posts: this.state.posts.concat(post)});
        }
      });
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
        this.getPosts(this.state.lastId);
      }
    }
  }

  generateImage() {
    console.log(`Generating random image...`);

    const rand = Math.floor(Math.random() * this.state.posts.length); // Get random number from 1 to length of posts.
    const currPost = this.state.posts[rand];
    this.state.posts.splice(rand, 1); // Generate a random post, then remove it from the posts array so we don't display it again.

    if (!currPost.url.endsWith('.jpg')) { // Fix non-direct links.
      currPost.url += '.jpg'; // Account for non-direct links. TODO account for / ignore albums.
    }
    if (currPost.url.indexOf('https') === -1) { // Fix non-secure links.
      currPost.url = currPost.url.replace('http', 'https');
    }

    this.setState({
      url: `https://reddit.com${currPost.permalink}`,
      src: currPost.url,
      description: currPost.title,
      author: currPost.author.name
    });
    console.log(`Image '${currPost.title}' (index ${rand}) generated.`);
  }

  componentWillMount() { // On first load.
    // If the user has visited the site before,
    // continue from where they left off.
    if (typeof(Storage) !== 'undefined') {
      if (localStorage.lastPostId) {
        this.getPosts(localStorage.lastPostId);
      } else {
        this.getPosts();
      }
    }
  }

  render() {
    return (
      <div className="imgContainer">
        <img onClick={this.clickHandler} title={this.state.description} alt={this.state.description} src={this.state.src} />
        <a alt='Go to post.' title='Go to post.' href={this.state.url} id="info" className="info">
          {`'${this.state.description}' from user ${this.state.author}`}
        </a>
      </div>
    )
  }
}

export default Images;
