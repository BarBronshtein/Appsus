import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js';
export default {
  name: 'book-app',
  template: `
    <section class="book-app">

      <book-add @addBook="addSelectedBook"/>
        <book-filter @filtered="setFilter"/>
        <book-list :books="booksToShow" @selected="selectBook"/>
    </section>
    `,
  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: null,
    };
  },
  methods: {
    addSelectedBook({ searchKey, bookId }) {
      bookService
        .addBook(searchKey, bookId)
        .then(book => this.books.push(book));
    },
    removeBook(id) {
      bookService.remove(id).then(() => {
        const idx = this.books.findIndex(book => book.id === id);
        this.books.splice(idx, 1);
      });
    },
    selectBook(book) {
      this.selectedBook = book;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;

      const regex = new RegExp(this.filterBy.title, 'i');
      const { priceTo, priceFrom } = this.filterBy;
      return this.books.filter(
        ({ title, listPrice: { amount } }) =>
          regex.test(title) && amount >= priceFrom && amount <= priceTo
      );
    },
  },
  created() {
    bookService.query().then(books => (this.books = books));
  },
};
