import { bookService } from '../services/book-service.js';
import bookAddPreview from './book-add-preview.cmp.js';
export default {
  template: `
    <section class="book-add">
        <form @submit.prevent="getBooks" >
            <input placeholder="Search book to add..." type="search" v-model="searchKey">
            <button class="btn search btn">Search</button>
        </form>
        <ul v-if="opts?.length">
            <li v-for="opt in opts" :key="opt.id"><book-add-preview @addedBook="addBookToList" :opt="opt"/></li>
        </ul>
    </section>
`,
  data() {
    return {
      searchKey: '',
      opts: null,
      option: null,
      booksFromGoogle: null,
    };
  },
  created() {},
  methods: {
    getBooks() {
      bookService
        .getBooksFromGoogle(this.searchKey)
        .then(item => (this.opts = item.books))
        .catch(err => console.log(err));
    },
    addBookToList(bookId) {
      this.$emit('addBook', { searchKey: this.searchKey, bookId });
      this.searchKey = '';
    },
  },
  components: { bookAddPreview },
  computed: {},
  unmounted() {},
};
