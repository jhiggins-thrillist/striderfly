[Striderfly.xxx](https://striderfly.j0wy.com)
==========
![](public/striderfly.jpg)

## Installation
```
npm install && npm start
```

That builds the site and serves it at http://localhost:8787, rebuilding when you change a file. Requires Node.js 22 or later.

## Stack
Static HTML on Cloudflare Workers (Static Assets), built with a small Node script and Hogan.js, deployed with the `cf` CLI.

## Adding your page
Every contributor gets a folder in `contributors/`, with their page, assets and a `contributor.json` that puts them on the homepage. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add yours and open a pull request.

## Deploying
The site is a static-assets-only Cloudflare Worker at https://striderfly.j0wy.com. `build.js` copies `public/` and every contributor folder into `dist/`, and renders the homepage and 404 page from `views/`. Configuration is in `cloudflare.config.ts` and `wrangler.config.ts`.

```
npm run deploy
```

Deploying needs a `cf` login for the Cloudflare account that owns j0wy.com: `cf auth create <profile>`, then `cf auth activate <profile>` in this folder.
