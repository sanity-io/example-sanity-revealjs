/**
 * These serializers convert structured text from
 * Sanity into HTML with the hyperscript package.
 * Read more about serializers here:
 * https://github.com/sanity-io/block-content-to-hyperscript/
 * https://www.sanity.io/docs/front-ends/presenting-block-text
 */

const { h, urlFor } = require("./config.js");

module.exports = {
  types: {
    video: ({
      node: { autoplay = false, file: { asset = {} } = {} } = {},
      options: { projectId, dataset } = {}
    }) => {
      const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${
        asset._ref.split("-")[1]
      }.${asset._ref.split("-")[2]}`;
      //
      return h("video", {
        src: fileUrl,
        attrs: { autoplay: autoplay, playsinline: autoplay }
      });
    },
    image: ({
      node: { markDefs = [], asset = "", position = "full", caption = "" } = {}
    }) => {
      // Fragments are animations on paragraphs, list items and so on
      const fragment = markDefs.find(def => def._type === "fragment");
      if (caption) {
        return h(
          "div",
          { className: position },
          h("img", { src: urlFor(asset).url() }),
          h("p", { className: "caption", textContent: caption })
        );
      }
      return (
        asset &&
        h("img", {
          src: urlFor(asset).url(),
          className: position + (fragment && ` fragment ${fragment.type}`)
        })
      );
    },
    block: ({ children, node: { markDefs = [], style = "normal" } }) => {
      const fragment = markDefs.find(def => def._type === "fragment");
      if (/^h\d/.test(style)) {
        const level = style.replace(/[^\d]/g, "");
        return h(
          `h${level}`,
          {
            className: fragment && `fragment ${fragment.type}`
          },
          children
        );
      }
      return h(
        "p",
        { className: fragment && `fragment ${fragment.type}` },
        children
      );
    }
  },
  marks: {
    fragment: ({ children }) => h("span", children),
    link: ({ mark: { href = "", internal = "" } = {}, children = [] }) => {
      return h(
        "a",
        {
          className: "link",
          href: href ? href : `/${internal}`
        },
        children
      );
    },
    strong: ({ children }) => h("strong", children),
    normal: ({ children }) => h("span", children)
  },
  listItem: ({ children, node: { markDefs } }) => {
    const fragment = markDefs.find(def => def._type === "fragment");
    return h(
      "li",
      { className: fragment && `fragment ${fragment.type}` },
      children
    );
  }
};
