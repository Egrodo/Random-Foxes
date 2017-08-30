This is an app that will display random images from a provided subreddit, and allow you to sort using flairs. It displays the images randomly and provides a neat interface to view them. 

Before I made this I was still new to React and had never used any advanced API stuff before. This was an exercise to learn these things and to practice writing code in a way that I might in the real-world. Not only that, but I got to create something that may actually be useful to some people, and that I can show off to non-programmer friends.

I'm using [Snoowrap](https://github.com/not-an-aardvark/snoowrap) as a wrapper for the Reddit API. I use Snoowrap to generate a promise that gives me a group of 25 posts from 'hot'. After that I filter those down to only the posts that have the given flair (if any), then I pick a post at random and display it to the screen.

Check it out [here](https://egrodo.github.io/Reddit-Image-Generator). Any feedback/code review is more than welcome, I want to perfect my coding as much as possible.