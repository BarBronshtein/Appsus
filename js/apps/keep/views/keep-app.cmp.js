import { keepService } from '../services/keep-service.js';
import noteList from '../cmps/note-list.cmp.js';
// import bookFilter from '../cmps/book-filter.cmp.js';
// import bookAdd from '../cmps/book-add.cmp.js';
export default {
  name: 'keep-app',
  template: `
    <section class="keep-app">
        <!-- <book-filter @filtered="setFilter"/> -->
        <note-list :notes="notesToShow"/>
        <!-- <book-add @addBook="addSelectedBook"/> -->
    </section>
    `,
  components: {
    noteList,
    // bookFilter,
    // bookAdd,
  },
  data() {
    return {
      notes: null,
      // filterBy: null,
    };
  },
  methods: {
    // addSelectedBook({ searchKey, bookId }) {
    //   keepService
    //     .addBook(searchKey, bookId)
    //     .then(book => this.notes.push(book));
    // },
    // removeBook(id) {
    //   keepService.remove(id).then(() => {
    //     const idx = this.notes.findIndex(book => book.id === id);
    //     this.notes.splice(idx, 1);
    //   });
    // },
    setFilter(filterBy) {
      // this.filterBy = filterBy;
    },
  },
  computed: {
    notesToShow() {
      return this.notes
    },
  },
  created() {
    keepService.query().then(notes => (this.notes = notes));
  },
};
