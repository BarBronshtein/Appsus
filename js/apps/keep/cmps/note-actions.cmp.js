import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['note'],
    template: `<article class="note-actions-container">
  <p class="pin-note fa-solid fa-thumbtack"
  @click="onPinNote"></p>
  <p class="change-note-clr fa-solid fa-palette"
  @click="onColorPicker">
  <input class="hide-element" ref="colorPicker" type="color" @input="changeBackgroundColor"></p>
  <p class="duplicate-note fa-solid fa-clone"
  @click="onDuplicateNote"></p>
  
  <router-link :to="'/email/inbox/'+noteDetail">
    <p class="send-note fa-solid fa-paper-plane"></p>
</router-link>

  <p class="delete-note fa-solid fa-trash-can"
  @click="onDeleteNote"></p>
    </article>
    `,
    data() {
        return {
        };
    },
    methods: {
        onPinNote() {
            this.note.isPinned = this.note.isPinned ? false : true
            eventBus.emit('update-note', this.note)
        },
        onColorPicker() {
            this.$refs.colorPicker.click()
        },
        changeBackgroundColor() {
            this.note.style.backgroundColor = this.$refs.colorPicker.value
            eventBus.emit('update-note', this.note)
        },
        onDuplicateNote() {
            // saving the note in a new variable
            const newNote = JSON.parse(JSON.stringify(this.note))
            //reseting the id so that the "save" func will save it as a new item
            newNote.id = ''
            eventBus.emit('save-new-note', newNote)
        },
        onDeleteNote() {
            eventBus.emit('remove-note', this.note)
        },
    },
    computed: {
        noteDetail() {
            let { title, txt } = this.note.info
            txt = txt ? txt : this.note.info.url
            return '?' + new URLSearchParams({ title, txt }).toString()
        }
    },
};
