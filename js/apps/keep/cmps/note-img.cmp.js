import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <img :src="note.info.url">
    <h4 contenteditable @input="updateTitle">{{note.info.title}}</h4>
    <note-actions :note="note"/>
  </article>
  `,
  data() {
    return {};
  },
  methods: {
    updateTitle(e) {
      this.note.info.title = e.target.innerText
      this.$emit('update', this.note)
    },
  },
  computed: {
  },
  components: {
    noteActions
  }
};
