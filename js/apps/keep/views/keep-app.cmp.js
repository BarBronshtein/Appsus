import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';
// import bookFilter from '../cmps/book-filter.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section class="keep-app">
        <!-- <book-filter @filtered="setFilter"/> -->

        <note-add @addBook="addSelectedBook"/>
        <note-list :notes="notesToShow"/>
    </section>
    `,
  components: {
    noteAdd,
    noteList,
    // bookFilter,
  },
  data() {
    return {
      notes: null,
      newNoteEvent: null,
      updateNoteEvent: null,
      removeNoteEvent: null,
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
    saveNewNote(newNote) {
      keepService.save(newNote).then(note => {
        //saving the last note to the first place
        this.notes.unshift(note)
        keepService.saveNotes(this.notes)
      })
    },
    updateNote(note) {
      keepService.save(note).then()
    },
    removeNote(noteToremove) {
      keepService.remove(noteToremove.id).then(() => {
        const noteIdx = this.notes.findIndex(note => note.id === noteToremove.id);
        this.notes.splice(noteIdx, 1);
      })
    },
  },
  computed: {
    notesToShow() {
      return this.notes
    },
  },
  created() {
    keepService.query().then(notes => (this.notes = notes))
    // handle events
    this.newNoteEvent = eventBus.on('save-new-note', this.saveNewNote)
    this.updateNoteEvent = eventBus.on('update-note', this.updateNote)
    this.removeNoteEvent = eventBus.on('remove-note', this.removeNote)
  },
  unmounted() {
    this.newNoteEvent()
    this.updateNoteEvent()
    this.removeNoteEvent()
  }
};
