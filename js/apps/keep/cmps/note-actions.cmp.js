import { keepService } from '../services/keep-service.js';

export default {
    props: ['note'],
    template: `<article class="note-actions-container">
  <p class="pin-note fa-solid fa-thumbtack"
  @click="onPinNote"></p>
  <p class="change-note-clr fa-solid fa-palette"
  @click="onColorPicker">
  <input class="hide" ref="colorPicker" type="color" @input="changeBackgroundColor"></p>
  <p class="duplicate-note fa-solid fa-clone"
  @click="onDuplicateNote"></p>
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
            keepService.save(this.note)
        },
        onColorPicker() {
            this.$refs.colorPicker.click()
        },
        changeBackgroundColor() {
            this.note.style.backgroundColor = this.$refs.colorPicker.value
            keepService.save(this.note)
        },
        onDuplicateNote() {
            const currNoteId = this.note.id
            this.note.id = ''
            keepService.save(this.note)
            this.note.id = currNoteId
        },
        onDeleteNote(){
            keepService.remove(this.note.id)
        }
    },
    computed: {
    },
};
