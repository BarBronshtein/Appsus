import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js';
// import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
  props: ['notes'],
  template: `
  <section class="note-list">
    <div v-for="note in notes" :key="note.id" class="notes-container">
      <component :is="note.type"
          :info="note.info"
          :style="note.style">
      </component>
    </div>

  </section>`,
  components: {
    noteTxt,
    noteImg,
    // noteVideo,
    noteTodos,
  },
  data() {
    return {};
  },
  methods: {
    remove(id) {
      this.$emit('removed', id);
    },
  },
  computed: {},
};
