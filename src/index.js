const { client, imageUrl, h, blocksToHtml } = require("./config.js");
const serializers = require("./serializers");
const errorDialog = require("./errorDialog");
const joinTransitions = transitions => transitions.join(" ");

/**
 * Read more about GROQ query fetching
 * https://www.sanity.io/docs/data-store/how-queries-work
 */
const query = '*[_type == "talk" && slug.current == $slug][0]';
const params = {
  slug: "sanity-backed-reveal.js-example"
};

client
  .fetch(query, params)
  .then(result => {
    renderSlides(result);
    window.Reveal.initialize(result.reveal);
  })
  .catch(() => {
    const body = document.getElementById("root");
    const dialog = document.createElement("dialog");
    dialog.innerHTML = errorDialog(client);
    body.appendChild(dialog);
    dialog.showModal();
  });

/**
 * Read more about real time updates
 * https://www.sanity.io/docs/data-store/realtime-updates
 */
client.listen(query, params).subscribe(({ result }) => {
  if (result) {
    const state = window.Reveal.getState();
    const slidesNodes = document.getElementById("slides");
    slidesNodes.innerHTML = "";
    renderSlides(result);
    window.Reveal.configure(result.reveal);
    window.Reveal.setState(state);
  }
});

/**
 * Now I understand why React and Vue is a thing…
 */
function renderSlides({ slides = [], reveal: config = {} }) {
  /**
   * Appends slides to the root revealjs HTML structure, if
   * there isn't any body content it just leaves an empty div.
   */
  slides.forEach(slide => {
    const { background = {}, content = [], transitions = [] } = slide;
    document.getElementById("slides").appendChild(
      h(
        "section",
        {
          attrs: {
            "data-background-color": background.color
              ? background.color.hex
              : "",
            "data-background-image": imageUrl(background.image),
            "data-transition":
              joinTransitions(transitions) || config.transition,
            "data-transitition-speed": config.transitionSpeed
          },
          innerHTML: blocksToHtml({
            blocks: content,
            serializers: serializers,
            projectId: client.clientConfig.projectId,
            dataset: client.clientConfig.dataset
          })
        },
        !content ? h("div") : null
      )
    );
  });
}
