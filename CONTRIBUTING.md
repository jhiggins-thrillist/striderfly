# Contributing to Striderfly

Everyone gets one folder. Put your page and everything it needs in `contributors/<your-handle>/`, open a pull request, and once it's merged your page goes live at `https://striderfly.j0wy.com/<your-handle>/`.

## 1. Set up

Fork [jhiggins-thrillist/striderfly](https://github.com/jhiggins-thrillist/striderfly), clone your fork, and run:

```
npm install && npm start
```

You'll need Node.js 22 or later. The site runs at http://localhost:8787 and rebuilds when you save a file.

## 2. Make your folder

Pick a handle. It's your URL, so use lowercase letters, numbers and hyphens (e.g. `jhiggins`). It can't already be taken in `contributors/`, or match a folder in `public/` (like `stylesheets`).

```
contributors/your-handle/
  contributor.json      required: puts you on the homepage
  index.html            optional: your page, at /your-handle/
  scripts/  stylesheets/  images/  fonts/  ...anything your page needs
```

### contributor.json

```json
{
  "firstName": "Joseph",
  "lastName": "Higgins",
  "contribution": 10.00
}
```

`contribution` is a number. The homepage lists everyone from highest to lowest.

With just a `contributor.json` you're listed on the homepage without a link. Add an `index.html` and your name links to your page.

### Your page

* **Plain static files only:** HTML, CSS, JavaScript, images, audio, fonts. There's no server code and no build step for your folder; it's copied to the site as-is.
* **Use relative paths** for your own files, so your folder works wherever it's served from:
  * In HTML or JavaScript, relative to your page: `<script src="scripts/game.js">`, `new Audio('images/boing.wav')`
  * In CSS, relative to the stylesheet: `url(../images/bg.png)`
* **Keep it self-contained.** Put copies of fonts, libraries and images in your folder instead of loading them from other sites. Video embeds like YouTube are the exception. Give a YouTube `<iframe>` the attribute `referrerpolicy="strict-origin-when-cross-origin"`, or it won't play on the live site (error 153).
* **Shared files** from `public/` are available at the root if you want them: `/stylesheets/normalize.css`, `/striderfly.png`, `/striderfly.jpg`, and the favicons.
* **More pages** go next to `index.html`: `contributors/your-handle/game.html` is served at `/your-handle/game`.

## 3. Check it locally

With `npm start` running, open http://localhost:8787/your-handle/ and make sure:

* Your page works, and the browser console shows no errors or 404s.
* Your name shows up (and links to your page) on http://localhost:8787/.

## 4. Open a pull request

* **Only change files inside your own folder.** If you need something changed elsewhere, explain why in the PR.
* **Don't commit** `dist/`, `.cloudflare/` or `node_modules/` (they're gitignored).
* **Keep files under 25 MB each.** That's Cloudflare's limit for a single file.
* **Only include things you have the right to share**, and keep license files with any third-party fonts or libraries you bundle (see `contributors/jhiggins/fonts/` for an example).
* **No trackers, analytics, ads, crypto miners, or anything that collects visitors' data.** The site already counts visits with Cloudflare Web Analytics, which doesn't use cookies, so there's no need to add your own. PRs are reviewed before they're merged.
* **Keep it good-natured.** This is a tribute to Strider.

After your PR is merged, a maintainer deploys the site and your page goes live.
