import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <h3>{{note.info.txt}}</h3>
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
