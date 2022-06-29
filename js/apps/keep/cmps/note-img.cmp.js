import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <img :src="note.info.url" :alt="note.info.title">
    <note-actions :note="note"/>
  </article>
  `,
  data() {
    return {};
  },
  computed: {
  },
  components:{
    noteActions
  }
};
