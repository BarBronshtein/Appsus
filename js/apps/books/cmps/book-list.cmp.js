import bookPreview from '../cmps/book-preview.cmp.js';
// import bookAdd from './book-add.cmp.js';
export default {
  template: `
  <section class="book-list">
    <ul>
        <article v-for="book in books" :key="book.id" class="book-preview-container">
            <router-link :to="'/book/'+book.id"><book-preview @select="select(book)" :book="book" /></router-link>
        </article>
    </ul>

  </section>`,
  components: { bookPreview },
  props: ['books'],
  data() {
    return {};
  },
  methods: {
    remove(id) {
      this.$emit('removed', id);
    },
    select(book) {
      this.$emit('selected', book);
    },
  },
  computed: {},
};
