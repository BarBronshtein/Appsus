import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <h2>{{note.info.title}}</h2>
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
  },
};
