import noteActions from "./note-actions.cmp.js";

export default {
    props: ['note'],
    template: `<article class="note-container">
    <audio controls>
      <source :src="note.info.url" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <h3 v-if="note.info.title">{{note.info.title}}</h3>
    <note-actions :note="note"/>
  </article>
  `,
    data() {
        return {};
    },
    computed: {
    },
    components: {
        noteActions
    }
};
