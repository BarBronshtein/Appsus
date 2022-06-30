import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <img :src="note.info.url">
    <h3 v-if="note.info.title">{{note.info.title}}</h3>
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
