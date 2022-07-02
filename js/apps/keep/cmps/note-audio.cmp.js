import noteActions from "./note-actions.cmp.js";

export default {
  props: ['note'],
  template: `<article class="note-container">
    <audio controls>
      <source :src="note.info.url" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
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
