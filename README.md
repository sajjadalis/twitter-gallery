# Twitter Gallery

### BETTER ALTERNATIVE WITH VUE 3 + VITE
[https://github.com/sajjadalis/twitter-media-gallery](https://github.com/sajjadalis/twitter-media-gallery)

Twitter Gallery (based on Vue 2) is using Twitter Official API to fetch media (photos and videos) from a Twitter Profile and then display it in a masonry gallery layout.

**[Demo Preview (Images)](https://pinboard.opera.com/view/da9b047c-8317-4432-8fbd-7a5d04f351d3)**

You will need to create an app in [Twitter Developer Portal](https://developer.twitter.com) and get [Bearer Token](https://i.imgur.com/tGBFcNq.png).

### Features:
- Search Photos
- Search Videos
- Preview Large Image or Video in Lightbox
- Play Video in ArtPlayer or Native HTML5 Player
- Open Image in New Tab for Full View, Save Image, Zoom-in, Zoom-out, Rotate

### Requirement
- Developer access to [Twitter API](https://developer.twitter.com)
- [Node.js](https://nodejs.org/en/download/) for development & build

### Project setup
- Create an App in Twitter Developer Portal
- Generate Bearer Token
- Clone the Repository
- Add Bearer Token in `.env` file. e.g. `VUE_APP_TWITTER_TOKEN=YourTokenHere.....`
- Run `npm install` or `yarn add` in Terminal to add all dependencies
- Run `npm run serve` or `yarn serve` for Compiles and hot-reload for development
- Run `npm run build` or `yarn build` for Compiles and minifies for production

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/) & [Vue.js documentation](https://vuejs.org/v2/guide/).
