const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const blocksToHtml = require("@sanity/block-content-to-html");
const h = require("hyperscript");

/**
 * Change projectId and dataset to
 * your thing after you have installed the
 * slide plugin with:
 * $ sanity install slidedeck
 *
 * If you set a token ($ sanity manage) you
 * can also get real live updates from drafts
 */
const client = sanityClient({
  projectId: "0wopf0m0",
  dataset: "production",
  useCdn: true,
  token:
    "skkLnj7MDW0ZKJ2turNVRuXqqoEUhwNPsUlAbbS4xCbhKuhoAp2jIgBnuNxEZbhX3PW9ZxtOdgfYAtZHzvAyFExA88JiqkSDOCQdYRrlOPuHV8xb3XFm7P4MlalPepnSgAwK1lWkFC1uZso8zTA0f5WJZ8tYJZald7PQKkwGM18SCCBWjOJt"
  /* token: 'sanity-auth-token', // or leave blank to be anonymous user */
});

function urlFor(source) {
  return source ? imageUrlBuilder(client).image(source) : undefined;
}

function imageUrl(url) {
  if (url) {
    return urlFor(url).url();
  }
  return false;
}

module.exports = {
  blocksToHtml,
  client,
  h,
  imageUrl,
  imageUrlBuilder,
  urlFor
};
