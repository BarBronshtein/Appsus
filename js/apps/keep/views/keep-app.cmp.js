import { keepService } from '../services/keep-service.js';
import noteList from '../cmps/note-list.cmp.js';
// import bookAdd from '../cmps/book-add.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section class="keep-app">
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
