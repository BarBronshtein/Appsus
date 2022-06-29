// import bookPreview from '../cmps/book-preview.cmp.js';

export default {
  props: ['notes'],
  template: `
  <section class="note-list">
    <ul>
        <article v-for="note in notes" :key="note.id" class="notes-container">
            <!-- <router-link :to="'/book/'+book.id"><book-preview :book="book" /></router-link> -->
        </article>
    </ul>

  </section>`,
  components: {
    // bookPreview
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
