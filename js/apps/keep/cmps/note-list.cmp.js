import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';


export default {
  props: ['notes'],
  template: `
  <section>
    <h2 class="list-title">Pinned</h2>
    <article class="note-list">
    <div v-for="note in notes" :key="note.id">
      <component v-if="note.isPinned" :is="note.type"
          :note="note"
          :style="note.style">
      </component>
    </div>
    </article>
    <h2 class="list-title">Others</h2>
    <article class="note-list">
    <div v-for="note in notes" :key="note.id">
      <component v-if="!note.isPinned" :is="note.type"
          :note="note"
          :style="note.style">
      </component>
    </div>
    </article>
  </section>`,
  components: {
    noteTxt,
    noteImg,
    noteVideo,
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
  computed: {
  },
};
