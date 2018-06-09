# Sanity backed Reveal.js frontend

This is a vanilla JS example of a Sanity backed [Reveal.js](https://github.com/hakimel/reveal.js) presentation frontend.

It updates live on new published changes, and with an added token with read permissions on every update.

It requires that you install the slide deck schema in your Sanity project with `$ sanity install slide-deck`

This project was made entirely on the amazing [Codesandbox](https://codesandbox.io), [go try it yourself](https://codesandbox.io/s/github/kmelve/example-revealjs).

## Get started

- Go into config.js and change the `projectId`, `dataset`, and `slug` to where your slide deck is.
- Add the frontend’s URL to your [Sanity’s project CORS settings](https://www.sanity.io/docs/cors) either [in the browser](https://sanity.io/manage) or by using the command `$ sanity cors add <url>` in the project folder.

