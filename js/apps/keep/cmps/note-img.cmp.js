export default {
  props: ['info'],
  template: `<article class="note-container">
    <img :src="info.url" :alt="info.title">

  </article>
  `,
  data() {
    return {};
  },
  computed: {
  },
};
