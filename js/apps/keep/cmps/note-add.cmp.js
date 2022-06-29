import { keepService } from '../services/keep-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
// import bookAddPreview from './book-add-preview.cmp.js';

export default {
    template: `
    <section class="note-add-container flex space-between">
        <input ref="noteTitle" type="text" placeholder="Write the title and press the Note type.">
        <div class="note-add-options">
            <p class="note-add-txt fa-solid fa-font"
            @click="onAddTxtNote"></p>
            <p class="note-add-img fa-solid fa-image"
            @click="onAddImgNote"></p>
            <p class="note-add-video fa-brands fa-youtube"></p>
            <p class="note-add-list fa-solid fa-list"></p>
        </div>
    </section>
`,
    data() {
        return {
        };
    },
    created() {

    },
    methods: {
        onAddTxtNote() {
            const newNote = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    txt: this.$refs.noteTitle.value,
                },
                style: {
                    backgroundColor: '#eeeeee',
                }
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddImgNote() {
            const newNote = {
                id: '',
                type: 'note-txt',
                isPinned: false,
                info: {
                    txt: this.$refs.noteTitle.value,
                },
                style: {
                    backgroundColor: '#eeeeee',
                }
            }
            eventBus.emit('save-new-note', newNote)
        }
    },
    components: {
        // bookAddPreview
    },
    computed: {},
    unmounted() { },
};
