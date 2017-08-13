import React, { Component } from 'react';
import './Images.css';
import oauth from './oauth_info.json'; // This is not secure, users still have access to them. React won't let me put outside of scope.
const snoowrap = require('snoowrap');

const r = new snoowrap(oauth);

let lastClick = 0; // Set lastClick to zero for the first time you click. This is bad practice, but how do I do it?

class Images extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      src: '',
      description: '',
      author: ''
    };

    this.generateImage = this.generateImage.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    // This is currently not fast as it requires loading of all n posts before displaying the first one.
    const promise = r.getSubreddit('foxes').getTop({time: 'all', limit: 25});
    promise.then(result => {
      result.forEach((post, i) => {
        if (post.link_flair_text === 'Pics!') {
          this.setState({posts: this.state.posts.concat(post)})
        }
      });
      this.generateImage();
    }, error => {
      console.log(`ERROR >>> ${error}`);
    });
  }

  clickHandler() {
    // Limit clicks to once per second in order to keep API calm.. figure out how to cache images later I guess?
    if (Date.now() - lastClick > 500) {
      lastClick = Date.now();
      if (this.state.posts.length > 0) {
        console.log(`${this.state.posts.length} left.`);
        this.generateImage();
      } else {
        document.getElementById('info').innerHTML = 'Out of foxes :(';
      }
    }
  }

  generateImage() {
    console.log(`Generating random image...`);

    const rand = Math.floor(Math.random() * this.state.posts.length); // Get random number from 1 to length of posts.
    const currPost = this.state.posts[rand];

    this.state.posts.splice(rand, 1);

    if (!currPost.url.endsWith('.jpg')) currPost.url += '.jpg'; // Account for non-direct links. TODO account for / ignore albums.
    this.setState({
      src: currPost.url,
      description: currPost.title,
      author: currPost.author.name
    });
    console.log(`Image '${currPost.title}' (index ${rand}) generated.`);
  }

  componentWillMount() { // On first load.
    this.getPosts(); // First collect displayable posts.
  }

  render() {
    return (
      <div className="imgContainer">
        <img onClick={this.clickHandler} title={this.state.description} alt={this.state.description} src={this.state.src} />
        <p id="info" className="info">
          {`'${this.state.description}' from user ${this.state.author}`}
        </p>
      </div>
    )
  }
}

export default Images;
