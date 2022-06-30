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
            <p class="note-add-video fa-brands fa-youtube"
            @click="onAddVideoNote"></p>
            <p class="note-add-list fa-solid fa-list"
            @click="onAddListNote"></p>
        </div>

        <input type="file" class="hide-element" ref="fileInput" @change="onImageSelect"/>
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
                    title: this.$refs.noteTitle.value,
                },
                style: {
                    backgroundColor: '#eeeeee',
                }
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddImgNote() {
            this.$refs.fileInput.click()
            console.log("ffff");
        },
        onImageSelect(ev) {
            var reader = new FileReader()
            const imgTitle=this.$refs.noteTitle.value
            const img = new Image()
            reader.onload = function (event) {
                img.src = event.target.result
                const newNote = {
                    id: '',
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: img.src,
                        title: imgTitle,
                    },
                    style: {
                        backgroundColor: '#eeeeee',
                    },
                }
                eventBus.emit('save-new-note', newNote)
            }
            reader.readAsDataURL(ev.target.files[0])
        },
        onAddVideoNote() {
            const vidUrl= prompt('Enter Youtube video adress')
            if(!vidUrl) return
            const newNote = {
                id: '',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: this.$refs.noteTitle.value,
                    url:vidUrl.replace("watch?v=", "embed/"),
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
        },
        onAddListNote() {
            const newNote = {
                id: '',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: this.$refs.noteTitle.value,
                    todos: [],
                },
                style: {
                    backgroundColor: '#eeeeee',
                },
            }
            eventBus.emit('save-new-note', newNote)
        },
        onUploadPhoto(ev) {

        }
    },
    components: {
        // bookAddPreview
    },
    computed: {},
    unmounted() { },
};
