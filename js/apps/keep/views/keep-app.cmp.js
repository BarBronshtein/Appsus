import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { utilService } from '../../../services/utils-service.js';
import noteList from '../cmps/note-list.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section class="keep-app">
      <note-add/>
        <note-filter @filtered="setFilter"/>
      <note-list :notes="notesToShow" @updated="updateNote"/>
    </section>
    `,
  components: {
    noteAdd,
    noteList,
    noteFilter,
  },
  data() {
    return {
      notes: null,
      newNoteEvent: null,
      updateNoteEvent: null,
      removeNoteEvent: null,
      filterBy: null,
    };
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    saveNewNote(newNote) {
      keepService.save(newNote).then(note => {
        //saving the last note to the first place
        this.notes.unshift(note)
        keepService.saveNotes(this.notes)
        eventBus.emit('show-msg', {
          txt: 'Note Saved!',
          type: 'success',
        })
      })
    },
    updateNote(note) {
      console.log('please');
      utilService.debounce(()=>{
        console.log('some')
        // keepService.save(note).then()
      },100)
    },
    removeNote(noteToremove) {
      keepService.remove(noteToremove.id).then(() => {
        const noteIdx = this.notes.findIndex(note => note.id === noteToremove.id);
        this.notes.splice(noteIdx, 1)
        eventBus.emit('show-msg', {
          txt: 'Note Removed!',
          type: 'error',
        })
      })
    },
  },
  computed: {
    notesToShow() {
      if (!this.filterBy) return this.notes;

      const regex = new RegExp(this.filterBy.title, 'i');
      const filterType = this.filterBy.type
      return this.notes.filter((note) =>
        regex.test(note.info.title) && (note.type === filterType || filterType === '')
      )

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
