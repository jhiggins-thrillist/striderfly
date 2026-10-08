[Striderfly.xxx](https://striderfly.j0wy.com)
==========
![](public/striderfly.jpg)

Striderfly is a parody site a group of coworkers built in the summer of 2014, after Strider took a picture in front of *that* Taylor Swift wings mural (a #WhatLiftsYou mural by Kelsey Montague). Everyone made a page in his honor, from a Doodle Jump clone to Frogger and Flappy Bird remakes to a shrine scored by Creed's "Higher," and it all lived at striderfly.xxx. Twelve years later, it's back.

Want to add your own page? Read the [contributor notes](CONTRIBUTING.md).

## Installation
```
npm install && npm start
```

That builds the site and serves it at http://localhost:8787, rebuilding when you change a file. Requires Node.js 22 or later.

## Stack
Static HTML on Cloudflare Workers (Static Assets), built with a small Node script and Hogan.js, deployed with the `cf` CLI.

## Deploying
The site is a static-assets-only Cloudflare Worker at https://striderfly.j0wy.com. `build.js` copies `public/` and every contributor folder into `dist/`, and renders the homepage and 404 page from `views/`. Configuration is in `cloudflare.config.ts` and `wrangler.config.ts`.

The site asks search engines not to index it: `public/_headers` sends `X-Robots-Tag: noindex, nofollow` with every response. There's deliberately no `robots.txt` blocking crawlers, since a crawler that can't fetch a page never sees its noindex header.

Visits are counted with Cloudflare Web Analytics, which is turned on for the j0wy.com zone and doesn't use cookies.

```
npm run deploy
```

Deploying needs a `cf` login for the Cloudflare account that owns j0wy.com: `cf auth create <profile>`, then `cf auth activate <profile>` in this folder.

## License
The code is released under the [MIT License](LICENSE). That covers what Striderfly's contributors wrote, not the third-party material bundled with it:

* Libraries and fonts keep their own licenses: Phaser, Crafty, jQuery and prefix-free are MIT, and Gloria Hallelujah and Press Start 2P are under the SIL Open Font License (included next to each font).
* FlappyBK is based on [hyspace/flappy](https://github.com/hyspace/flappy), and the Jump game on Kushagra Agarwal's CSSDeck demo.
* Game art, sounds, logos and photos that came from elsewhere, including the Flappy Bird, Frogger and Burger King artwork and the homepage photo, belong to their owners and aren't covered by the MIT License. If something here is yours and you'd like it removed, open an issue.

---

*The original README from 2014, kept as it was. Its setup steps are for the old Express app and no longer apply.*

[Striderfly.xxx](http://striderfly.xxx)
==========
![](http://assets7.thrillist.com/v1/image/1280637/size/tl-today_sq)

## Installation
```
npm install && npm start
```

## Stack
Node.js, Express, Hogan.js

## Pull requests
**Please fork, and then submit a pull request.**  All code must be encapsulated within your respective directories, unless necessary:

```
./routes/user-handle.js
./views/user-handle/*.hjs
./public/stylesheets/user-handle/*.css
./public/javascripts/user-handle/*.js
./public/images/user-handle/*.*
```

## Creating Your Page
Add a route file to the routes directory, with your handle.  Your pages will now be served from your handle.  ```e.g. http://striderfly.xxx/jhiggins```
```js
/**
 * Example User's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('user-handle/index');
});

module.exports = router;

```

## Contributor Information

All information is stored in ```config/users.js```.  To add a new user, add an object to the ```module.exports```.

```
// Example
module.exports = [
  {
    "handle": "jhiggins",
    "lastName": "Higgins",
    "firstName": "Joseph",
    "email": "joseph.james.higgins@gmail.com",
    "contribution": 10.00,
  }
];
```
