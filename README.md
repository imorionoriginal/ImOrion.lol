# ImOrion.lol
my portfolio website

## Adding content

Go to https://imorion.lol/admin/ and sign in with a GitHub token. Saving in the panel commits to `main`, and the site updates by itself a few minutes later.

The panel edits the JSON files in `src/content/`. Uploads go to `public/media/`, `public/videos/` and `public/music/`. Its settings are in `public/admin/config.yml`, so a new field has to be added there and in the matching `src/content/*.ts` file.

The panel script is pinned in `public/admin/index.html`. To update it, change the version and replace the `integrity` value with the new file's sha384 hash.
