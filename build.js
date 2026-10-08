/**
 * Builds the site into dist/ for Cloudflare Workers Static Assets.
 *
 *   public/                  site-wide files, copied as-is
 *   contributors/<handle>/   a contributor's folder, served at /<handle>/
 *                            (their contributor.json is never published)
 *   views/index.hjs          the homepage, listing every contributor
 *   views/error.hjs          the 404 page
 */
var fs = require('fs');
var path = require('path');
var Hogan = require('hogan.js');

var dist = path.join(__dirname, 'dist');
var contributorsDir = path.join(__dirname, 'contributors');

function isPublished(file) {
    var name = path.basename(file);
    return name !== 'contributor.json' && name[0] !== '.';
}

function copy(from, to) {
    fs.cpSync(from, to, { recursive: true, filter: isPublished });
}

function render(view, locals) {
    var text = fs.readFileSync(path.join(__dirname, 'views', view + '.hjs'), 'utf8');
    return Hogan.compile(text).render(locals);
}

fs.rmSync(dist, { recursive: true, force: true });
copy(path.join(__dirname, 'public'), dist);

var contributors = fs.readdirSync(contributorsDir, { withFileTypes: true })
    .filter(function (entry) {
        return entry.isDirectory();
    })
    .map(function (entry) {
        var dir = path.join(contributorsDir, entry.name);
        var info = JSON.parse(fs.readFileSync(path.join(dir, 'contributor.json'), 'utf8'));
        var hasPage = fs.existsSync(path.join(dir, 'index.html'));

        if (hasPage) {
            copy(dir, path.join(dist, entry.name));
        }

        return Object.assign({ handle: entry.name, hasDirectory: hasPage }, info);
    })
    .sort(function (a, b) {
        return b.contribution - a.contribution;
    });

fs.writeFileSync(path.join(dist, 'index.html'), render('index', { users: contributors }));
fs.writeFileSync(path.join(dist, '404.html'), render('error', { message: 'Not Found', error: {} }));

console.log('Built ' + contributors.length + ' contributors (' +
    contributors.filter(function (c) { return c.hasDirectory; }).length + ' with pages) into dist/');
